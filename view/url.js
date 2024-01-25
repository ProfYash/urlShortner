require('dotenv').config()
const db = require('../models/index')
const URLERROR = require('../errors')
const { Op } = require('sequelize')
const uuid = require('uuid')
const { url } = require('inspector')
const ping = require('ping');
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
  static trimmURL(longURL) {
    return longURL.replace(/^https?:\/\//, '')
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
  static async testLongurl(longURL) {
    if (longURL[longURL.length - 1] == '/') {
      longURL = longURL.slice(0, longURL.length - 1)
    }
    let res = ping.promise.probe(longURL);
    // console.log(await res);
    return (await res).alive
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
