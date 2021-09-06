import { Protobuf } from '..'

let options: Protobuf.Configure = {
  // 文件目录
  path: './tests/pb',
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
    type: 'MSG_REQUEST_BASE',
    // 字段解码相关类型
    fields: {}
  },
  // 默认请求消息类型
  requestType: 'MSG_REQUEST_PAYLOAD'
}
let buffer: Buffer

describe('\nProtoBuf API\n', () => {

  test('Encode', async () => {
    let protobuf: Protobuf = new Protobuf(options)
    buffer = protobuf.encode(1000, { username: 'admin' })
    expect(buffer instanceof Buffer).toBeTruthy()
  })

  test('Decode', async () => {
    let protobuf: Protobuf = new Protobuf(options)
    let res = protobuf.decode<any>(buffer.slice(4))
    expect(res?.msgtype).toBe(1000)
    expect(res?.payload?.username).toBe('admin')
  })
})