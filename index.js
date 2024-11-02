const express = require('express');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require("path");
const redirectSSL = require('redirect-ssl');
const { initialize, query } = require('./database');

// Routers
const auth = require('./services/auth/auth.router');
const products = require('./services/products/products.router');
const stripe = require('./services/stripe/stripe.router');

initialize();
const app = express();
const ssl = config.get('ssl');

app.enable('strict routing', false);
app.enable('trust proxy', true);
app.options('*', cors());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false
}));
app.use(compression());
app.use(express.json());

if (config.get('ssl')) {
  console.log('SSL enabled');
  app.use(redirectSSL);
}

app.use('/images', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  // Allow all origins for static images
  next();
}, express.static('images'));

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const result = await query(`INSERT INTO email_subscriptions (email) VALUES (?) RETURNING *`, [email]);
    return res.status(201).json({ subscribed: true });
  } catch (error) {
    return res.status(500).json({ subscribed: false });
  }
});

app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/stripe', stripe);

app.get('/.well-known/mta-sts.txt', (req, res) => res.sendFile(path.resolve('./mta-sts.txt')));
app.use(express.static('../frontend/dist/angular'));
app.use((req, res) => res.sendFile(path.resolve('../frontend/dist/angular/index.html')));

if (ssl) {
  const https = require('https');
  const fs = require('fs');
  const options = {
    key: fs.readFileSync(ssl.key),
    cert: fs.readFileSync(ssl.cert),
  };
  https.createServer(options, app)
    .listen(443, () => {
      console.log(`Listening on port 443...`);
    });
} else {
  const port = config.get('port');
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}
