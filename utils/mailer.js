const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

// auth with our mailgun API key and domain
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

// create a mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// SEND EMAIL
// const user = {
//   email: 'lucia.reynoso@students.makeschool.com',
//   name: 'Light',
//   age: '27'
// };

module.exports.sendMail = (user, req, res) => {
    nodemailerMailgun.sendMail({
      from: 'no-reply@example.com',
      to: user.email, // An array if you have multiple recipients.
      subject: 'Pet purchased!',
      template: {
        name: 'email.handlebars',
        engine: 'handlebars',
        context: user
      }
    }).then(info => {
        console.log('Response: ' + info);
        res.redirect(`/pets/${req.params.id}`);
    }).catch(err => {
        console.log('Error: ' + err);
        res.redirect(`/pets/${req.params.id}`);
    });
}
