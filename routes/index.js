const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
  res.render('home')
})

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use((req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = router
