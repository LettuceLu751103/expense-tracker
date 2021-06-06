const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/user')


router.use('/record', authenticator, record)
router.use('/users', users)
router.use('/', authenticator, home)
module.exports = router