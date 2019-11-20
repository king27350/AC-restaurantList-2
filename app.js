const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// require mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
//require restaurant model
const Restaurant = require('./models/restaurant')
// connect err
db.on('error', () => {
  console.log('mongodb error !')
})
// connect success
db.once('open', () => {
  console.log('mongodb connected !')
})

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// routes setting
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/user', require('./routes/user'))

app.listen(port, () => {
  console.log(`express is listening on port:${port}`)
})