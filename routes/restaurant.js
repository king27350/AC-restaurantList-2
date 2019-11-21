const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const { authenticated } = require('../config/auth')
// 列出全部 餐廳
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})
// 搜尋 餐廳
router.get('/search', authenticated, (req, res) => {
  Restaurant.find({ _id: req.params.id, userId: req.user._id }, (err, restaurants) => {
    const keyword = req.query.keyword
    if (err) return console.error(err)
    const searchResult = restaurants.filter(restaurant => {
      return (
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    res.render('index', { restaurants: searchResult, keyword })
  })
})

//列出分類後餐廳
router.get('/sort/:sort', authenticated, (req, res) => {
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
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
  // 使用 query string方法 做 search & sort 的分類 ，在search value 裡給個default值 再直接按取search btn 時候可以自動跑
})
// 顯示一筆 餐廳 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})
// 新增一筆  餐廳
router.post('/', authenticated, (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    userId: req.user._id,
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
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})
// 修改 餐廳
router.put('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
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
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router