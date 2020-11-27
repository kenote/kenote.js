const path = require('path')
const fs = require('fs')
const template = require('lodash/template')

const config = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  engine: 'html',
  configure: app => {
    app.engine('html', (path, options, callback) => {
      let html = fs.readFileSync(path, 'utf8')
      html = template(html)(options)
      callback(null, html)
    })
  }
}

module.exports = config