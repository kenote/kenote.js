const path = require('path')

const config = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  extension: 'html',
  engine: 'lodash'
}

module.exports = config