const { StatusCodes } = require('http-status-codes')
const { URLView } = require('../../../view/url')
const URLERROR = require('../../../errors/')
const { addURL,
  createShortURL,
  findLongUrl } = require('../service/url')
require('dotenv').config()


const createURL = async (req, res, next) => {
  try {
    const longURL = req.body.longURL
    if (!longURL) {
      throw URLERROR.BadRequestError('longURL must be specified')
    }
     longURL = URLView.trimmURL(longURL)
    if (! await URLView.testLongurl(longURL)) {
      throw URLERROR.BadRequestError('Url you submitted is no longer active or alive')
    }
    let newURL = new URLView(longURL)
    newURL = await createShortURL(newURL)
    const newURLData = await addURL(newURL)
    res.status(StatusCodes.CREATED).json(newURLData)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getURL = async (req, res, next) => {
  try {
    const shortURL = process.env.BASE_URL + req.params.urlCode

    if (!shortURL) {
      throw URLERROR.BadRequestError('shortURL must be specified')
    }
    const longUrl = await findLongUrl(shortURL)
    console.log(longUrl)
    if (!longUrl) {
      throw URLERROR.NotFoundError('longUrl Not found')
    }
    res.redirect(`http://${longUrl}`);
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  createURL,
  getURL,
}
