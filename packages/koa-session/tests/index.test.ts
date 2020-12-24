import request from 'supertest'
import { ServiceEngine } from '@kenote/koa'
import session from '../examples/plugins/session'
import RoutesAPI from '../examples/routes/api'
import uuid from 'uuid'

let engine: ServiceEngine | null

describe('\nTests', () => {

  beforeAll(async () => {
    engine = new ServiceEngine({ keys: [ 'keys', uuid.v4() ] })
    engine.register(session)()
    engine.register(RoutesAPI)('/api')
  })

  afterAll(() => {
    engine = null
  })

  test('set/get session', async () => {
    if (engine) {
      let res = await request(engine.app.callback()).get('/api')
      expect(res.body?.count).toEqual(1)
    }
  })

})