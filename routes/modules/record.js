
const express = require('express')

const router = express.Router()

const Record = require('../../models/record')



router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {

  Record.create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})

router.get('/edit/:id', (req, res) => {
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

router.post('/edit/:id', (req, res) => {
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

router.post('/delete/:id', (req, res) => {
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