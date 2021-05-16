
const express = require('express')

const PORT = 3000

const app = express()

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 載入靜態檔案
app.use(express.static('public'))

// 資料庫設定
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

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


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.redirect('/')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.post('/delete', (req, res) => {
  res.redirect('/')
})


app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`)
})