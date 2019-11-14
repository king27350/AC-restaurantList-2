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
//列出分類後餐廳
app.get('/restaurants/sort/:sort', (req, res) => {
  const sorting = req.params.sort
  if (sorting === 'asc' || sorting === 'desc') {
    Restaurant.find({})
      .sort({ name: `${req.params.sort}` })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  } else {
    Restaurant.find({})
      .sort({ rating: `${req.params.sort}` })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }

})

// 新增一筆 餐廳 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// 顯示一筆 餐廳 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})
// 新增一筆  餐廳
app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})
// 修改 餐廳 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})
// 修改 餐廳
app.put('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name,
      restaurant.name_en = req.body.name_en,
      restaurant.category = req.body.category,
      restaurant.image = req.body.image,
      restaurant.location = req.body.location,
      restaurant.phone = req.body.phone,
      restaurant.google_map = req.body.google_map,
      restaurant.rating = req.body.rating,
      restaurant.description = req.body.description,
      restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect(`/restaurants/${req.params.id}`)
      })
  })
})
// 刪除 餐廳
app.delete('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
  res.send('search page')
})

app.listen(port, () => {
  console.log(`express is listening on port:${port}`)
})