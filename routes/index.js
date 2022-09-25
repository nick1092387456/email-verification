const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Mail_AC,
    pass: process.env.Mail_PS,
  },
})

const rand = Math.floor(Math.random() * 100 + 54)
const host = 'localhost:3000'
let mailOptions = null

router.get('/home', (req, res) => {
  res.render('home')
})

router.post('/send', (req, res) => {
  const userEmail = req.body.email
  const link = 'https://' + host + '/verify?id=' + rand
  mailOptions = {
    to: userEmail,
    subject: 'Please confirm your Email account',
    html:
      'Hello, Please Click on the link to verify your email.' +
      link +
      '>Click here to verify',
  }
  // console.log(mailOptions)
  // smtpTransport.sendMail(mailOptions, function (error, response) {
  //   if (error) {
  //     console.log(error)
  //     res.end('error')
  //   } else {
  //     console.log('Message send: ' + response.message)
  //     res.end('sent')
  //   }
  // })
})

router.get('/verify', (req, res) => {
  console.log(req.protocol + ':/' + req.get('host'))
  if (req.protocol + '://' + req.get('host') == 'http://' + host) {
    console.log('Domain is matched. Information is from Authentic email')
    if (req.query.id == rand) {
      console.log('email is verified')
      res.end('<h1>Email ' + mailOptions.to + ' is been Successfully verified')
    } else {
      console.log('email is not verified')
      res.end('<h1>Bad Request</h1>')
    }
  } else {
    res.end('<h1>Request is from unknown source')
  }
})

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use((req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = (app) => {
  app.use(router)
}
