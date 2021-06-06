const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
const User = require('../user') // 載入 user model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const userObj = require('./userSeed.json')

const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')

  userObj.users.forEach(async user => {

    let { email, name, password } = { ...user }
    await User.findOne({ email })
      .then(data => {
        console.log(data)
        if (data) {
          console.log('使用者已存在')
          return
        }
        // console.log('準備新增使用者')
        return bcrypt
          .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
          .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
          .then(hash => User.create({
            name,
            email,
            password: hash // 用雜湊值取代原本的使用者密碼
          }))
          .catch(err => console.log(err))

      })
      .then(() => {
        db.close()
        console.log('done')
      })
      .catch(error => {
        console.log(error)
      })
  })




})