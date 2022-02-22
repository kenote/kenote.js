# @kenote/common

Based on `@kenote` common methods and types.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/common.svg
[npm-url]: https://www.npmjs.com/package/@kenote/common
[downloads-image]: https://img.shields.io/npm/dm/@kenote/common.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/common
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## CommonEngine

```ts
import { CommonEngine } from '@kenote/common'
import express, { Express } from 'express'
import { RequestListener } from 'http'

export class ServiceEngine extends CommonEngine<Express> {

  constructor (options?: any) {
    super()
    this.__application = express()
  }

  get name (): string {
    return 'express'
  }

  get server (): RequestListener {
    return this.__application
  }
}
```

## HttpClient

```ts
import { HttpClient, xhrClient } from '@kenote/common'

// Axios
const client: ClientInstance = axios
// XMLHttpRequest
const client: ClientInstance = xhrClient(new XMLHttpRequest())

const httpClient = (options?: HeaderOptions) => new HttpClient(client, options)

async function start () {
  // Send Get
  await httpClient().get(url, params)
  // Send Post
  await httpClient().post(url, body)
  // Download
  await httpClient().download(url)
  // Upload
  await httpClient().upload(url)
}
```

## DataNodeProxy

```ts
import { dataNodeProxy, CommonDataNode } from '@kenote/common'

const data: CommonDataNode[] = [
  {
    key: '1',
    name: 'home'
  }
]

const dataProxy = dataNodeProxy(data)
// Find Single Node
let node = dataProxy.find({ name: 'home' })
console.log( node )
// Add Single Node
dataProxy.add(null, { key: '2', name: 'aaa' })
dataProxy.add('1', { key: '3', name: 'bbb' })
// Update Single Node
dataProxy.update('1', { name: 'ccc' })
// Remove Single Node
dataProxy.remove('1')
// Get Changed Data
console.log( dataProxy.data )
```

---
MIT License.