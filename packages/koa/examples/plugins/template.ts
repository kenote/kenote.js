import path from 'path'
import { KoaEngine } from '../..'

const config: KoaEngine.TemplateOptions = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  extension: 'html',
  engine: 'lodash'
}

export default config