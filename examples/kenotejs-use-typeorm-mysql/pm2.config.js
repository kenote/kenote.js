// PM2 Configure
const { loadConfig } = require('@kenote/config')
const { merge } = require('lodash')
const { name, secretKey, tsnode } = loadConfig('config/server')

const config = {
  name,
  max_memory_restart: '200M',
  instances: 1,
  instance_var: secretKey || 'INSTANCE_ID',
  exec_mode: 'cluster',
  cwd: './',
  env: {
    NODE_ENV: 'production',
    SERVER_PORT: 4000
  }
}

function getApplication (tsnode) {
  if (tsnode) {
    return merge(config, {
      script: './node_modules/.bin/ts-node',
      args: '-T -r tsconfig-paths/register ./src/index.ts',
      env: {
        TS_NODE_PROJECT: './tsconfig.json',
      }
    })
  }
  return merge(config, {
    script: './dist/index.js',
    interpreter_args: '--harmony',
  })
}

module.exports = {
  apps: [
    getApplication(tsnode),
  ]
}