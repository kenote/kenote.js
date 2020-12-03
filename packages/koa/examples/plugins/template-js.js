const path = require('path')

const config = {
  viewDir: path.resolve(process.cwd(), 'examples/views'),
  engine: 'html',
  configure: {
    map: {
      html: 'lodash'
    }
  }
}

module.exports = config