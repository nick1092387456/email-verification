const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use(routes)
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app
