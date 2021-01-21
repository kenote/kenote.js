
import { DataNodeProxy, dataNodeProxy, initMaps, removeMaps } from '../src'
import { CommonDataNode } from '..'

const data: CommonDataNode[] = [
  {
    key: '1',
    name: 'home'
  }
]

describe('\nTests DataNode', () => {

  test('find', () => {
    let dataNode = new DataNodeProxy(data)
    let info = dataNode.find({ name: 'home' })
    expect(info?.key).toEqual('1')
  })

  test('add', () => {
    let dataNode = new DataNodeProxy(data)
    dataNode.add(null, { key: '2', name: 'user' })
    let info = dataNode.find({ name: 'user' })
    expect(info?.key).toEqual('2')
    dataNode.add('1', { key: '1-2', name: 'about' })
    info = dataNode.find({ name: 'about' })
    expect(info?.key).toEqual('1-2')
  })

  test('update', () => {
    let dataNode = new DataNodeProxy(data)
    dataNode.update('1', { name: 'index' })
    let info = dataNode.find({ name: 'index' })
    expect(info?.key).toEqual('1')
  })

  test('remove', () => {
    let dataNode = new DataNodeProxy(data)
    dataNode.remove('1')
    expect(dataNode.data.length).toEqual(0)
  })

  test('maps', () => {
    let dataNode = new DataNodeProxy(data)
    dataNode.add(null, { key: '2', name: 'user' })
    dataNode.add('1', { key: '1-2', name: 'about' })
    let __data = initMaps(dataNode.data)
    let info = dataNodeProxy(__data).find({ name: 'about' })
    expect(!!info?.maps).toBeTruthy()
    __data = removeMaps(__data)
    info = dataNodeProxy(__data).find({ name: 'about' })
    expect(!!info?.maps).toBeFalsy()
  })
})