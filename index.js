const express = require('express');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { initialize, query } = require('./database');

initialize();
const app = express();
const ssl = config.get('ssl');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.static('../frontend/dist/angular/browser'));

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const result = await query(`INSERT INTO email_subscriptions (email) VALUES (?) RETURNING *`, [email]);
    return res.status(201).json({ subscribed: true });
  } catch (error) {
    return res.status(500).json({ subscribed: false });
  }
});

if (ssl) {
  const https = require('https');
  const fs = require('fs');
  const options = {
    key: fs.readFileSync(ssl.key),
    cert: fs.readFileSync(ssl.cert),
  };
  https.createServer(options, app)
    .listen(443, () => {
      console.log(`Listening on port 3333...`);
    });
} else {
  app.listen(3333, () => {
    console.log(`Listening on port 3333...`);
  });
}
