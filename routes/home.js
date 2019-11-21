const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const { authenticated } = require('../config/auth')

// 餐廳首頁
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id }).exec((err, restaurants) => {
    const rnd = Math.floor(Math.random() * Math.floor(restaurants.length))
    const coupon = Math.random().toString(36).substr(2)
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants, randomRestaurant: restaurants[rnd], coupon })
  })
})

module.exports = router