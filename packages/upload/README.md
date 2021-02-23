# @kenote/upload

Upload module for HTTP Server. 

## Examples

```ts
import express from 'express'
import bodyParser from 'body-parser'
import { uploadStore, putStream } from '@kenote/upload'

const config = {
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

const app = express()
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

app.post('/upload', async (req, res, next) => {
  try {
    let store = uploadStore(options, req)
    let result = await store.upload(putStream, ErrorInfo)
    return res.json(result)
  } catch (error) {
    return next(error)
  }
})

app.listen(4000)
```

---
MIT License.