const express = require('express')
const app = express()
require('dotenv').config()
const { engine } = require('express-handlebars')
// import urlExist from 'url-exist'

// ;(async () => {
//   const result = await urlExist('https://google.com')
// })()

const port = process.env.PORT || 3000

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/tools', express.static(__dirname + '/tools'))
app.use('/public', express.static(__dirname + '/public'))
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

require('./routes')(app)
