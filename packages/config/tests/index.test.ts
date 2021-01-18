
import { loadConfig, asyncRequire } from '../src'

describe('\n Test\n', () => {

  test('loadConfig', () => {
    let config: any = loadConfig('data')
    expect(config.host).toBe('0.0.0.0')
  })

  test('loadConfig of filter', () => {
    let config: any = loadConfig('data', { 
      filter: filename => !/(release)\.(json|yaml|yml)$/.test(filename)
    })
    expect(config.host).toBe('localhost')
  })

  test('asyncRequire', () => {
    let ct = asyncRequire('../data')
    expect(ct.a).toBe(1)
  })
})

