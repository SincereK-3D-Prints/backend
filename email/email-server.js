const express = require('express');
const { sendVerifyEmail } = require('./send');

const app = express();
const port = 80;

app.use(express.json());

app.post('/', async (req, res) => {
  const { email, displayName, code } = req.body;
  console.log('Received POST request with JSON data:');

  await sendVerifyEmail(email, displayName, code);
  res.json({ message: 'POST request successful!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://mail.sincerek3dprints.shop:${port}`);
});
