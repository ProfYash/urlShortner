require('dotenv').config()
const db = require('../models/index')
const URLERROR = require('../errors')
const { Op } = require('sequelize')
const uuid = require('uuid')
const { url } = require('inspector')

class URLView {
  constructor(longURL) {
    this.longURL = longURL
    this.shortURL = ""
  }
  setShortURL(shortURL) {
    this.shortURL = shortURL
  }
  async doesURLExist() {
    try {
      const findURL = await db.url.findOne({
        where: {
          longURL: this.longURL
        }
      })

      if (!findURL) {
        throw new URLERROR.BadRequestError('URL not found.')
      }
    } catch (error) {
      throw new URLERROR.BadRequestError(error)
    }
  }
  static async findLongUrl(shortURL) {
    try {
      const findURL = await db.url.findOne({
        where: {
          shortURL: shortURL
        }
      })
      if (!findURL) {
        throw new URLERROR.BadRequestError('shortURL not found.')
      }
      let urlData = { ...findURL.dataValues }
      console.log(urlData)
      return urlData
    } catch (error) {
      throw new URLERROR.BadRequestError(error)
    }

  }
  static async testLongurl(longURL){

  }
  async addURL(transaction) {
    try {
      const url = await db.url.create(this, {
        transaction: transaction
      })
      let urlData = { ...url.dataValues }
      return urlData
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { URLView }
