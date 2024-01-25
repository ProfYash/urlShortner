const RightLeadsAppError = require("./custom-error")
const BadRequestError = require("./bad-request")
const UnauthorizedError = require("./unauthorized")
const NotFoundError = require('./not-found')

module.exports = {
  RightLeadsAppError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError
}