'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const AdonisMongoose = require('mongoose')
AdonisMongoose.Promise = global.Promise

class MongooseProvider extends ServiceProvider {

  register() {
    this.app.singleton('Adonis/Addons/AdonisMongoose', function (app) {
      const Config = app.use('Adonis/Src/Config')
      const mongoUrl = Config.get('mongo.url', false)

      if (mongoUrl) {
        AdonisMongoose.connect(mongoUrl, { useMongoClient: true })

      } else {
        const mongoHost = Config.get('mongo.host', '127.0.0.1')
        const mongoPort = Config.get('mongo.port', '27017')
        const mongoDb = Config.get('mongo.db', 'test')
        const mongoUser = Config.get('mongo.user', '')
        const mongoPass = Config.get('mongo.pass', '')
        const connectUri = `${mongoHost}:${mongoPort}/${mongoDb}`
        const connectionString = (mongoUser !== '' || mongoPass !== '') ? `mongodb://${mongoUser}:${mongoPass}@${connectUri}` : `mongodb://${connectUri}`

        AdonisMongoose.connect(connectionString, { useMongoClient: true })
      }


      return AdonisMongoose
    })
  }

}

module.exports = MongooseProvider
