
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

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

//引入路由器
const routes = require('./routes')


// 資料庫設定
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

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