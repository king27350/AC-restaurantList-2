const express = require('express')
const router = express.Router()

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login inspection
router.post('/login', (req, res) => {
  res.send('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register inspection
router.post('/register', (req, res) => {
  res.send('logout')
})

module.exports = router