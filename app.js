const sequelize = require('./db/connect')

const dbConnection = async () => {
  try {
    await db.sequelize.authenticate()
    console.log('db successfully connected')
  } catch (error) {
    console.error(error)
    await db.sequelize.close()
  }
}

module.exports = { dbConnection }
