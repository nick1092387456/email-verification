const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const {
  checkOriginURLExist,
  checkShortURLExist,
} = require('../tools/checkURLExist')
const { genShort } = require('../tools/shortenURL')
const { signUpURL } = require('../controllers/urlList-controller')
const urlListController = require('../controllers/urlList-controller')


const rand = Math.floor(Math.random() * 100 + 54)
const host = 'localhost:3000'
let mailOptions = null
let load = {}
let originURL = ''

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Mail_AC,
    pass: process.env.Mail_PS,
  },
})

router.get('/home', (req, res) => {
  res.render('home')
})

router.post('/send', (req, res) => {
  const userEmail = req.body.email
  load = req.body
  originURL = req.body.url
  const link = 'https://' + host + '/verify?id=' + rand
  mailOptions = {
    // to: userEmail,
    to: 'nick1092387456@gmail.com',
    subject: 'Please confirm your Email account',
    html:
      'Hello, Please Click on the link to verify your email.' +
      link +
      '>Click here to verify',
  }

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
      res.end('error')
    } else {
      console.log('Message send: ' + response.message)
      res.render('home', { message: '確認信件已寄出，請檢察您的信箱' })
    }
  })
})

router.get('/verify', async (req, res) => {
  try {
    console.log(req.protocol + ':/' + req.get('host'))
    if (req.protocol + '://' + req.get('host') == 'http://' + host) {
      console.log('Domain is matched. Information is from Authentic email')
      if (req.query.id == rand) {
        console.log('email is verified')
        const short = await genShort()
        const shortURL = 'https://gov.tw/' + short
        await signUpURL(load, short)
        res.render('result', { originURL, shortURL })
      } else {
        console.log('email is not verified')
        res.end('<h1>Bad Request</h1>')
      }
    } else {
      res.end('<h1>Request is from unknown source')
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/getShort', urlListController.getShortURL)

router.post('/urlIsExist', (req, res) => {})

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.use((req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = (app) => {
  app.use(router)
}
