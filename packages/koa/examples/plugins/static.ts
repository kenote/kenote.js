import path from 'path'
import { KoaEngine } from '../..'

const config: KoaEngine.StaticOptions = {
  rootDir: path.resolve(process.cwd(), 'examples/static'),
  rootPath: '/static'
}

export default config