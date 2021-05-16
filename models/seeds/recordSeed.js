const mongoose = require('mongoose')
const Record = require('../record') // 載入 todo model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    await Record.create({
      name: '捷運',
      date: '2021-05-16',
      category: '交通',
      amount: '50'

    })
  }
  db.close()
  console.log('done')
})