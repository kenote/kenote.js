# @kenote/protobuf

Client sending protobuf data through socket.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/protobuf.svg
[npm-url]: https://www.npmjs.com/package/@kenote/protobuf
[downloads-image]: https://img.shields.io/npm/dm/@kenote/protobuf.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/protobuf
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Examples

`Node.js` 端用法
```ts
import { Protobuf, TCPSocket } from '@kenote/protobuf'

const options: Protobuf.Configure = {
  // 文件目录
  path: './pb',
  // 入口文件
  socket: 'socket.proto',
  // 编码设置
  encode: {
    // 消息类型
    type: 'MSG_REQUEST_BASE',
    // 字段默认值
    fields: {},
    // 消息编号映射路径
    msgtype: 'msgtype',
    // 消息参数映射路径
    payload: 'payload'
  },
  // 解码设置
  decode: {
    // 消息类型
    type: 'MSG_RESPONSE_BASE',
    // 字段解码相关类型
    fields: {}
  },
  // 默认请求消息类型
  requestType: 'MSG_RESPONSE_PAYLOAD'
}

// 创建示例对象
const protobuf = new Protobuf(options)

// 对消息进行编码
const buffer = protobuf.encode(1000, { ... })

// 解码返回数据
const data = protobuf.decode(buffer.slice(4))

// 与 TCP Socket 并行用法
async function bootstrap () {
  let config: TCPSocket.Configure = {
    // 主机
    host: '0.0.0.0',
    // 端口
    port: 8080,
    // 设置 ProtoBuffer
    protobuf: options
  }
  try {
    // 创建客户端
    let client = new TCPSocket(config)
    // 发送请求数据并进行编/解码，完成后自动关闭连接
    let result = await client.encode(1000, { ... }).send(true)
    console.log(result)
  } catch (error) {
    console.error(error.message)
  }
}
```

浏览器端使用

1. 先转换 proto 文件

```bash
# 将 proto 文件转为 js
pbjs -t static-module -w commonjs -o socket.js socket.proto
# 根据 js 生成 ts 类型
pbts -o socket.d.ts socket.js
```

2. 使用 ts

```ts
import { Browser } from '@kenote/protobuf'
import PBSocket from './socket'

const options: Browser.Configure<typeof PBSocket> = {
  // 接入protobuf的TS类型
  socket: PBSocket,
  // 编码设置
  encode: {
    // 消息类型
    type: 'com.socket.MSG_REQUEST_BASE',
    // 字段默认值
    fields: {},
    // 消息编号映射路径
    msgtype: 'msgtype',
    // 消息参数映射路径
    payload: 'payload'
  },
  // 解码设置
  decode: {
    // 消息类型
    type: 'com.socket.MSG_RESPONSE_BASE',
    // 字段解码相关类型
    fields: {}
  },
  // 默认请求消息类型
  requestType: 'com.socket.MSG_RESPONSE_PAYLOAD'
}

// 创建示例对象
const protobuf = new Browser(options)

// 对消息进行编码
const buffer = protobuf.encode(1000, { ... })

// 将 Buffer 转为 ArrayBuffer
const arrayBuffer = new Uint8Array(buffer.slice(4)).buffer

// 解码返回数据
const data = protobuf.decode(buffer)
```

---
MIT License.