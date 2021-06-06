const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
const User = require('../user') // 載入 user model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const initData = require('./recordSeed.json')

const passport = require('passport')
const bcrypt = require('bcryptjs')


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')


  const user1Id = await User.find({ name: 'user1' })
    .then(user => {
      return user[0]._id
    })
    .catch(error => {
      console.log(error)
    })
  const user2Id = await User.find({ name: 'user2' })
    .then(user => {
      return user[0]._id
    })
    .catch(error => {
      console.log(error)
    })

  for (let i = 0; i < initData.record.length; i++) {
    if (i % 2 === 0) {
      initData.record[i].userId = user1Id
    } else {
      initData.record[i].userId = user2Id
    }
    await Record.create(initData.record[i])
      .then((dd) => {
        console.log(dd)

      })
      .catch(error => {
        console.log(error)
      })
  }

  db.close()

})