import path from 'path'
import { ExpressEngine } from '../../'

const config: ExpressEngine.TemplateOptions = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  extension: 'html',
  engine: 'lodash'
}

export default config