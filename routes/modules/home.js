const express = require('express')

const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
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




module.exports = router