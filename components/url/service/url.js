const URLERROR = require('../../../errors')
const db = require('../../../models')
const { URLView } = require('../../../view/url')
const addURL = async (url) => {
  const transaction = await db.sequelize.transaction()
  try {
    // await url.doesURLExist()
    const urlData = await url.addURL(transaction)
    await transaction.commit()
    return urlData;
  } catch (error) {
    await transaction.rollback()
    throw new URLERROR.BadRequestError(error)
  }

}

const findLongUrl = async shortURL => {
  try {
    const urlData = await URLView.findLongUrl(shortURL)
    if (!urlData.longURL) {
      throw new URLERROR.BadRequestError('longUrl could not be fetched.')
    }
    return urlData.longURL
  } catch (error) {
    console.error(error)
    throw new URLERROR.BadRequestError('longUrl could not be fetched.')
  }
}
const createShortURL = async (url) => {
  try {
    let result = '';
    let length = 8;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const charIndex = url.longURL.charCodeAt(Math.floor(Math.random() * url.longURL.length));
      result += characters.charAt(charIndex % charactersLength);
    }
    const shortURL = process.env.BASE_URL + result
    url.setShortURL(shortURL)
    return url
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  addURL,
  findLongUrl,
  createShortURL
}
