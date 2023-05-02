const express = require('express')
const {
  getURL,
  createURL
} = require('./controller/url')
const urlRouter = express.Router()

urlRouter.post('/', createURL)
urlRouter.get('/:urlCode', getURL)
module.exports = urlRouter
