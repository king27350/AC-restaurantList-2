const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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
// routes setting
// 餐廳首頁
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})
// 列出全部 餐廳
app.get('/restaurants', (req, res) => {
  return res.redirect('/')
})
// 新增一筆 餐廳 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// 顯示一筆 餐廳 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})
// 新增一筆  餐廳
app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})
// 修改 餐廳 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})
// 修改 餐廳
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('修改 Todo')
})
// 刪除 餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

app.get('/search', (req, res) => {
  res.send('search page')
})

app.listen(port, () => {
  console.log(`express is listening on port:${port}`)
})