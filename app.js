
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




app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(data => {
      let money = 0
      for (let i = 0; i < data.length; i++) {
        money += Number(data[i].amount)
      }
      res.render('index', { recordData: data, recordAmount: money })
    })
    .catch(error => {
      console.log(error)
    })

})

app.post('/', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  Record.create(reqData)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(data => {
      res.render('edit', { recordData: data })
    })
    .catch(error => {
      console.log(error)
    })

})

app.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const editData = req.body
  Record.findById(id)
    .then(reqData => {
      reqData.name = editData.name
      reqData.date = editData.date
      reqData.category = editData.category
      reqData.amount = editData.amount
      reqData.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})

app.post('/delete/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(deleteOne => {
      deleteOne.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})

app.get('/filterData/:category', (req, res) => {
  const category = req.params.category
  if (category === '99') {
    console.log('請求全部資料')
    Record.find()
      .lean()
      .then(filterData => {
        console.log(filterData)
        res.json(filterData)
      })
      .catch(error => {
        console.log(error)
      })

  } else {
    console.log('請求部分資料')
    Record.find({ category })
      .lean()
      .then(filterData => {
        console.log(filterData)
        res.json(filterData)
      })
      .catch(error => {
        console.log(error)
      })
  }


})

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`)
})