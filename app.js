const express = require('express')
const app = express()
const port = 3000

//require express-handlebars
const exphbs = require('express-handlebars')
//require restaurant json
const restaurantList = require('./restaurant.json')
//require restaurant model
const Restaurant = require('./models/restaurant')
// require mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
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

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  //console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`express is listening on port:${port}`)
})