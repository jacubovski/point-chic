var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contato');
});
router.post('/', async function (req, res, next) {
  const send = await sendMail(req.body);
  res.status(200).json({message: 'Email enviado com sucesso!', data: send});
});

const sendMail = async (payload) => {
  try {
    const {
      name,
      email,
      subject,
      body
    } = payload;
    const message = `
      E-mail: ${email}.
      Mensagem: ${body}
    `;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'brenojacubovski@gmail.com', // generated ethereal user
        pass: 'bRn_1123581321_bRn' // generated ethereal password
      }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${name}`, // sender address
      to: 'brenojacubovski@gmail.com', // list of receivers
      subject, // Subject line
      text: message, // plain text body
    });

    return info;
  } catch (error) {
    console.log(error);
  }

};

module.exports = router;
