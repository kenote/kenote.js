import express from 'express'
import request from 'supertest'
import bodyParser from 'body-parser'
import path from 'path'
import { uploadStore } from '../src/core'
import { putStream } from '../src/local'
import { UploadStoreOptions } from '../types'

let app: express.Application | null
let filePath = path.resolve(__dirname, 'testFiles', 'test.txt')
let options: UploadStoreOptions = {
  max_limit: '4mb',
  urlprefix: 'http://localhost:4000/uploadfiles',
  root_dir: 'uploadfiles',
  errors: {
    limit: 301,
    mimetype: 302
  }
}

function ErrorInfo (code: number, opts: string[]) {
  return {
    code,
    message: opts.join(',')
  }
}

describe('', () => {

  beforeAll(async () => {
    app = express()
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
    app.post('/upload', async (req, res, next) => {
      let { dir } = req.query
      try {
        let store = uploadStore(options, req)
        let result = await store.upload(putStream, ErrorInfo, dir as string ?? '')
        return res.send(result)
      } catch (error) {
        return res.json(error)
      }
    })
  })

  afterAll(() => {
    app = null
  })

  test('upload file', async () => {
    let res = await request(app).post('/upload').attach('file', filePath)
    expect(res.status).toBe(200)
  })

})