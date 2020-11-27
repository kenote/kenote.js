import path from 'path'
import fs from 'fs'
import template from 'lodash/template'
import { ExpressEngine } from '../../'

const config: ExpressEngine.TemplateOptions = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  engine: 'html',
  configure: app => {
    app.engine('html', (path: string, options: object, callback: (e: any, rendered?: string) => void) => {
      let html = fs.readFileSync(path, 'utf8')
      html = template(html)(options)
      callback(null, html)
    })
  }
}

export default config