import mongoose, { ConnectionOptions } from 'mongoose'
import userModelDao from './dao/user'

const uris = 'mongodb://localhost:27017/mongodb_test'
const options: ConnectionOptions = { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true
}

describe('\nMongoDB Connect\n', () => {

  beforeAll(async () => {
    try {
      await mongoose.connect(uris, options)
    } catch (error) {
      console.error(`connect to ${uris} error: ${error.message}`)
    }
  })

  afterAll(async () => {
    await userModelDao.clear()
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })

  test('Create User', async () => {
    let user = await userModelDao.create({ username: 'test' })
    expect(user && user['username']).toBe('test')
  })

  test('findOne User', async () => {
    let user = await userModelDao.findOne({ username: 'test' })
    expect(user && user['username']).toBe('test')
  })

  test('find All Users', async () => {
    let users = await userModelDao.find()
    expect(users.length).toBe(1)
  })

  test('find Users for conditions', async () => {
    let users = await userModelDao.find({ username: 'test' })
    expect(users.length).toBe(1)
  })

  test('counts of find All Users', async () => {
    let counts = await userModelDao.counts()
    expect(counts).toBe(1)
  })

  test('counts of find Users for conditions', async () => {
    let counts = await userModelDao.counts({ username: 'test' })
    expect(counts).toBe(1)
  })

  test('list of All Users', async () => {
    let users = await userModelDao.list()
    expect(users.counts).toBe(1)
  })

  test('updateOne of User', async () => {
    let result = await userModelDao.updateOne({ username: 'test' }, { username: 'update' })
    expect(result.ok).toBe(1)
  })

  test('update of Users', async () => {
    let result = await userModelDao.updateMany({ username: 'update' }, { username: 'test' })
    expect(result.ok).toBe(1)
  })

  test('remove of Users', async () => {
    let result = await userModelDao.remove({ username: 'test' })
    expect(result.deletedCount).toBe(1)
  })
})