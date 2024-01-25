const { StatusCodes } = require("http-status-codes")
const RightLeadsAppError = require("./custom-error")

class NotFound extends RightLeadsAppError {
    constructor(errorMessage) {
        super(errorMessage)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound