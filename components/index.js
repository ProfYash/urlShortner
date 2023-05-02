const express = require('express')
const urlRouter = require('./url')
const router = express.Router()
router.use('/url', urlRouter)
module.exports = router
