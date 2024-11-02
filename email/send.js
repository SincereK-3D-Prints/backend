const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');
const { verificationCodeTemplate } = require('./verification-code');

const transporter = nodemailer.createTransport(directTransport({
  name: 'sincerek3dprints.shop'
}));

const options = {
  from: 'info@sincerek3dprints.shop',
  subject: 'Verify Shibiko AI Account',
  dkim: {
    domainName: "sincerek3dprints.shop",
    keySelector: "mail",
    privateKey: fs.readFileSync(path.join(__dirname, './private.pem'), 'utf8')
  }
};

const sendVerifyEmail = (email, displayName, code) =>
  new Promise((resolve, reject) => {
    const html = verificationCodeTemplate(displayName, code);
    transporter.sendMail(
      { ...options, to: email, html },
      (error, info) => error ? reject(error) : resolve(info)
    );
  });

module.exports = {
  sendVerifyEmail
};
