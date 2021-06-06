
const express = require('express')
const session = require('express-session')
const PORT = process.env.PORT || 3000

const app = express()
const flash = require('connect-flash')
require('./config/mongoose')
const category_image = ['<i class="fas fa-home"></i>',
  '<i class="fas fa-shuttle-van"></i>',
  '<i class="fas fa-grin-beam"></i>',
  '<i class="fas fa-utensils"></i>',
  '<i class="fas fa-pen"></i>']
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: {
    getImage: function (category) {
      return category_image[category]
    }
  }
}))
app.set('view engine', 'handlebars')

// 載入靜態檔案
app.use(express.static('public'))

// 使用 express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

//引入路由器
const routes = require('./routes')



const Record = require('./models/record')

// 設定 body-parser
// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)


app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`)
})