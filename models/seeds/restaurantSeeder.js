const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const data = require('/restaurant.json')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error !')
})

db.once('open', () => {
  console.log('db connected !')
  for (let i = 0; i < 8; i++) {
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
    })
  }
  console.log('done')
})