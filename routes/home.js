const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 餐廳首頁
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    //從資料庫隨機取1組餐廳
    const rnd = Math.floor(Math.random() * Math.floor(restaurants.length))
    const coupon = Math.random().toString(36).substr(2)
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants, randomRestaurant: restaurants[rnd], coupon })
  })
})

module.exports = router