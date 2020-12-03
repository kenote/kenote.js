import path from 'path'
import { KoaEngine } from '../..'

const config: KoaEngine.TemplateOptions = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  engine: 'html',
  configure: {
    map: {
      html: 'lodash'
    }
  }
}

export default config