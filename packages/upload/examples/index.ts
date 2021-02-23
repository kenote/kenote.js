import express from 'express'
import bodyParser from 'body-parser'
import { uploadStore, putStream } from '../src'
import { UploadStoreOptions } from '../types'

const options: UploadStoreOptions = {
  max_limit: '4mb',
  urlprefix: 'http://localhost:4000/uploadfiles',
  root_dir: 'uploadfiles',
  original_name: true,
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

async function bootstrap () {
  let app = express()
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

  app.post('/upload', async (req, res, next) => {
    let { dir } = req.query
    try {
      let store = uploadStore(options, req)
      let result = await store.upload(putStream, ErrorInfo, dir as string ?? '')
      console.log(result)
      return res.json(result)
    } catch (error) {
      return res.json(error)
    }
  })

  app.listen(4000, () => {
    console.log(`starting...`)
  })

}

bootstrap()
