const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const data = require('./restaurant.json')
const dataUser = require('./user.json')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection



User.find({
  email: 'user1@expamle.com'
}).then(user => console.log(user))

