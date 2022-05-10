import { resolve } from 'path'
import { loadConfig, asyncRequire, pickFilesPromise } from '../src'

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
    let ct = asyncRequire('../data', { module })
    expect(ct.a).toBe(1)
  })

  test('pickFilesPromise', async () => {
    let globOptions = { cwd: resolve(process.cwd(), 'data'), nodir: true, realpath: true, ignore: ['!**/*.js'] }
    let files = await pickFilesPromise(['.**/**', '**'],globOptions )
    expect(files?.length).toBe(1)
  })
})

