const nodemailer = require('nodemailer');
const config = require('config');

module.exports = async function (email, uri) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config.get('nodemailer.transport'));
  console.log(uri)
  // setup email data with unicode symbols
  let mailOptions = {
    from: 'CoinKepperCorp@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Подтверждение email", // Subject line
    text: 'text', // plain text body
    html: `<a href="${uri}">Подтвердить email</a>` // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}