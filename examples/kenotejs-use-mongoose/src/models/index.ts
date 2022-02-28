import mongoose from 'mongoose'
import { ServerConfigure } from '@/types/config'
import { setGlobalOptions, Severity } from '@typegoose/typegoose'
import { logger, db } from '~/services'
import { loadConfig } from '@kenote/config'
import { User } from '~/entities'

setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})

export async function connect (mongoOpts: ServerConfigure.mongodb) {
  if (!mongoOpts) {
    logger.error(`No configuration found of MongoDB.`)
    process.exit(1)
  }
  let { uris, options } = mongoOpts
  try {
    await mongoose.connect(uris, options)
    logger.info(`connect to ${uris}`)
    let users = await db.user.find()
    if (users.length === 0) {
      let mockData = loadConfig<User[]>('mock/user.yml')
      await db.user.Dao.create(mockData)
      logger.info(`Initialization data completed.`)
    }
  } catch (error) {
    logger.info(`connect to ${uris} error: ${error.message}`)
    process.exit(1)
  }
}
