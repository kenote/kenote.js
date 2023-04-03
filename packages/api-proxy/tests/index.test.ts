import request from 'supertest'
import { ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/koa'
import appModule from '../examples/app.module'

let factory: ServiceEngine | null

describe('\n Test\n', () => {

  beforeAll(async () => {
    factory = await ServerFactory(new ServiceEngine()).create(appModule)
  })

  afterAll(() => {
    factory = null
  })

  test('Http Proxy', async () => {
    if (factory) {
      let res = await request(factory.app.callback()).get('/http/json')
      let data = JSON.parse(res.text)
      expect(data?.name).toEqual('kenote.js')
    }
  })

  test('Service Proxy', async () => {
    if (factory) {
      let res = await request(factory.app.callback()).get('/service/user')
      expect(res.body?.username).toEqual('thondery')
    }
  })
})
