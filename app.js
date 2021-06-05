
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

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