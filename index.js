const express = require('express');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const ssl = config.get('ssl');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.static('../frontend/dist/angular/browser'));

app.post('/api/subscribe', (req, res) => {
  console.log(req.body);
  res.status(201).send({ subscribed: true });
});

if (ssl) {
  const https = require('https');
  const fs = require('fs');
  const options = {
    key: fs.readFileSync(ssl.key),
    cert: fs.readFileSync(ssl.cert),
  };
  https.createServer(options, app)
    .listen(3333, () => {
      console.log(`Listening on port 3333...`);
    });
} else {
  app.listen(3333, () => {
    console.log(`Listening on port 3333...`);
  });
}
