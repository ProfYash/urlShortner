const { StatusCodes } = require("http-status-codes")
const RightLeadsAppError = require("./custom-error")

class BadRequestError extends RightLeadsAppError {
  constructor(errorMessage) {
    super(errorMessage)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError