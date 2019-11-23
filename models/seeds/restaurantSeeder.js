const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const data = require('./restaurant.json')
const dataUser = require('./user.json')
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error !')
})

db.once('open', () => {
  console.log('db connected !')


  //create user 
  for (let j = 0; j < 2; j++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(dataUser.results[j].password, salt, (err, hash) => {
        const newUser = new User({
          name: dataUser.results[j].name,
          email: dataUser.results[j].email,
          password: hash  //注意型別與schema設定是否一至
        })
        newUser.save().then(user => {
          // create restaurant list
          for (let i = 0 + j * 3; i < (j + 1) * 3; i++) {
            Restaurant.create({
              name: `${data.results[i].name}`,
              name_en: `${data.results[i].name_en}`,
              category: `${data.results[i].category}`,
              image: `${data.results[i].image}`,
              location: `${data.results[i].location}`,
              phone: `${data.results[i].phone}`,
              google_map: `${data.results[i].google_map}`,
              rating: `${data.results[i].rating}`,
              description: `${data.results[i].description}`,
              userId: `${user._id}`
            })
          }
        })
      })
    })
  }
  // check function 
  User.findOne({ email: 'user1@example.com' })
    .then(user => Restaurant.find({ userId: `${user._id}` })
      .then(restaurant => {
        if (restaurant.length === 3) {
          console.log('data done')
        }
      })
    )

})