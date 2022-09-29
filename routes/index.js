const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')
const { genShort } = require('../tools/shortenURL')
const { checkForm } = require('../tools/backendFormValidation')
const urlListController = require('../controllers/urlList-controller')
const db = require('../models')
const { urlList } = db

const host = 'localhost:3000'
let mailOptions = null

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

router.post('/checkState', urlListController.checkState)

router.post('/send', async (req, res) => {
  try {
    const { url, agency, email } = req.body
    const checkFormResult = await checkForm(agency, email, url)
    if (!checkFormResult) res.render('home', { message: '表單錯誤請重新填寫' })
    const verifyCode = uuidv4()
    const link = 'https://' + host + '/verify?id=' + verifyCode
    mailOptions = {
      to: 'nick1092387456@gmail.com',
      subject: 'Please confirm your Email account',
      html: `<p>請點擊連結完成認證 ${link} </p>`,
    }
    const shortURL = await genShort()
    const data = await urlList.findOne({ where: { originURL: url } })
    if (!data) {
      await urlList.create({
        shortURL,
        originURL: url,
        agency,
        email,
        urlState: 'certificating',
        verifyCode: verifyCode,
      })
    } else {
      await data.update({
        ...data,
        shortURL,
        originURL: url,
        agency,
        email,
        urlState: 'certificating',
        verifyCode: verifyCode,
      })
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error)
        res.end('error')
      } else {
        console.log('Message send: ' + response.message)
        res.render('home', { message: '確認信件已寄出，請檢查您的信箱' })
      }
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/verify', async (req, res) => {
  try {
    console.log(req.protocol + ':/' + req.get('host'))
    if (req.protocol + '://' + req.get('host') == 'http://' + host) {
      console.log('Domain is matched. Information is from Authentic email')
      const verifyCode = req.query.id
      const data = await urlList.findOne({ where: { verifyCode } })
      if (data) {
        console.log('email is verified')
        await data.update({
          ...data,
          urlState: 'isValid',
        })
        const shortURL = 'https://gov.tw/' + data.shortURL
        const originURL = data.originURL
        res.render('result', { originURL, shortURL })
      } else {
        console.log('email is not verified')
        res.end('<h1>Bad Request</h1>')
      }
    } else {
      res.end('<h1>Request is from unknown source</h1>')
    }
  } catch (err) {
    console.log(err)
  }
})

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
