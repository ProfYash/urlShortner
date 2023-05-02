const { StatusCodes } = require('http-status-codes')
const { URLView } = require('../../../view/url')
const { addURL,
  createShortURL,
  findLongUrl } = require('../service/url')
require('dotenv').config()


const createURL = async (req, res, next) => {
  try {
    const longURL = req.body.longURL
    if (!longURL) {
      res.status(StatusCodes.BAD_REQUEST).json(longURL)
      return
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
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'shortURL must be specified' })
      return
    }
    const longUrl = await findLongUrl(shortURL)
    console.log(longUrl)
    if (!longUrl) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'shortURL Not Found' })
      return
    }

    res.redirect(`https://${longUrl}`);
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  createURL,
  getURL,
}
