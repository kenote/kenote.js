import request from 'supertest'
import { ServiceEngine } from '@kenote/express'
import session from '../examples/plugins/session'
import RoutesAPI from '../examples/routes/api'
import uuid from 'uuid'

let engine: ServiceEngine | null

describe('\nTests', () => {

  beforeAll(async () => {
    let keys = [ 'keys', uuid.v4() ]
    engine = new ServiceEngine({ keys })
    engine.register(...session(keys))()
    engine.register(RoutesAPI)('/api')
  })

  afterAll(() => {
    engine = null
  })

  test('set/get session', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api')
      expect(res.body?.count).toEqual(1)
    }
  })

})