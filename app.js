const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

// require mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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

// 
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'let life be beautiful like summer flowers',
  resave: false, //true -> 每次使用者互動後，強制把session更新到session store裡
  saveUninitialized: true  //強制將未初始化的session存回session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。 
}))
//透過 passport.initialize() 來初始化 Passport。而至於啟動 session 功能，就是使用passport.session()。注意：passport.session() 要放在 session() 之後，才能確保執行順序正確。
app.use(passport.initialize())
app.use(passport.session())

// 從./ config / passport.js 中 export 出來的是一個函式，它需要接收一個 Passport instance。所以在 require('./config/passport')(passport) 這行程式碼裡，我們將 passport 當作參數傳到./ config / passport.js 裡。
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.currentUser = req.user
  //console.log(req.locals)
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// routes setting
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`express is listening on port:${port}`)
})