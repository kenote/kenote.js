import path from 'path'
import { ExpressEngine } from '../../'

const config: ExpressEngine.StaticOptions = {
  rootDir: path.resolve(process.cwd(), 'examples/static'),
  rootPath: '/static'
}

export default config