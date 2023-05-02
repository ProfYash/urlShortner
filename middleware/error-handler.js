const { StatusCodes } = require('http-status-codes')
const RightLeadsAppError = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof RightLeadsAppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
