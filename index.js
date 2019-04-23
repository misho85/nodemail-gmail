const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

require('dotenv').config({
  path: `.env`
});

const app = express();

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/api/form', (req, res) => {
  console.log('req: ', req);
  console.log('res: ', res);

  nodemailer.createTestAccount((err, account) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>FirstName: ${req.body.firstName}</li>
            <li>LastName: ${req.body.lastName}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: 'test@testaccount.com',
      to: process.env.USER,
      subject: 'Node.js Email with Secure OAuth',
      text: req.body.message,
      html: htmlEmail
    };

    // transporter.sendMail(mailOptions, (err, info) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log('Message sent: %s', info.response);
    //   console.log('Message sent: %s', JSON.stringify(info));
    //   console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    // });
    transporter.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(JSON.stringify(response));
      smtpTransport.close();
    });
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
