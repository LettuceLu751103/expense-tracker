
const express = require('express')

const router = express.Router()

const Record = require('../../models/record')



router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const data = req.body
  data.userId = userId
  Record.create(data)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})

router.get('/edit/:id', (req, res) => {
  const _id = req.params.id
  const id = req.user._id
  Record.findOne({ userId: id, _id: _id })
    .lean()
    .then(data => {
      console.log(data)
      res.render('edit', { recordData: data })
    })
    .catch(error => {
      console.log(error)
    })

})

router.post('/edit/:id', (req, res) => {
  const _id = req.params.id
  const editData = req.body
  const userId = req.user._id
  Record.findOne({ _id, userId })
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

router.post('/delete/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id: id, userId: userId })
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

router.get('/filterData/:category', (req, res) => {
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


module.exports = router