const mongoose = require('mongoose')
const Record = require('../record') // 載入 todo model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const initData = [
  {
    name: '捷運',
    date: '2021-05-13',
    category: '1',
    amount: '50'
  },
  {
    name: '看魔物獵人',
    date: '2021-05-18',
    category: '2',
    amount: '380'
  },
  {
    name: '房租',
    date: '2021-05-31',
    category: '0',
    amount: '35000'
  },
  {
    name: '買特級牛五花',
    date: '2021-05-05',
    category: '3',
    amount: '5000'
  },
  {
    name: '捷運',
    date: '2021-05-16',
    category: '交通',
    amount: '50'
  }

]
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')
  for (let i = 0; i < initData.length; i++) {
    await Record.create(initData[i])
  }
  db.close()
  console.log('done')
})