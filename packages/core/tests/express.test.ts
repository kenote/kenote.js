import request from 'supertest'
import { ServerFactory } from '../src'
import { ServiceEngine } from '@kenote/express'
import ApplicationModule from '../examples/application.module'

let engine: ServiceEngine | null

describe('\nTests Express', () => {

  beforeAll(async () => {
    engine = await ServerFactory(new ServiceEngine()).create(ApplicationModule)
  })

  afterAll(() => {
    engine = null
  })

  test('serve-static', async () => {
    if (engine) {
      let res = await request(engine.app).get('/static/hello.txt')
      expect(res.text).toEqual('Hello World!')
    }
  })

  test('request-get', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api')
      expect(res.text).toEqual('Hello World!')
    }
  })

  test('request-post', async () => {
    if (engine) {
      let res = await request(engine.app).post('/api')
      expect(res.text).toEqual('Hello World!')
    }
  })

  test('request-put', async () => {
    if (engine) {
      let res = await request(engine.app).put('/api')
      expect(res.text).toEqual('Hello World!')
    }
  })

  test('request-delete', async () => {
    if (engine) {
      let res = await request(engine.app).delete('/api')
      expect(res.text).toEqual('Hello World!')
    }
  })

  test('request-get-query', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api/query?t=1')
      expect(res.body.t).toEqual('1')
    }
  })

  test('request-get-params', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api/params/1')
      expect(res.body.t).toEqual('1')
    }
  })

  test('request-get-body', async () => {
    if (engine) {
      let res = await request(engine.app).post('/api/body').send({ t: '1' })
      expect(res.body.t).toEqual('1')
    }
  })

  test('request-get-not-found', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api/info')
      expect(res.status).toEqual(404)
    }
  })

  test('request-get-internal-server-error', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api/info/name')
      expect(res.status).toEqual(500)
    }
  })

  test('request-get-customize-api', async () => {
    if (engine) {
      let res = await request(engine.app).get('/api/info/email')
      expect(res.body.data.type).toEqual('email')
    }
  })
  
})
