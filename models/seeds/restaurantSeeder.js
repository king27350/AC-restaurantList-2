const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const data = require('/restaurant.json')
// 帶入 dataUser 的資料
// 跑回圈建立 user 資料
// 第二次迴圈 判斷 user的值 有哪些 餐廳參數 需要加進 餐廳資料裡建立
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
  // 跑法布正確 需要再做一次檢查 不然只會快速console 字串 並沒辦法做到 檢查有沒有完整的帶入資料
  console.log('done')
})