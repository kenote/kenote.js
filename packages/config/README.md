# @kenote/config

读取配置文件模块，配置文件使用 `json` 或 `yaml`

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/config.svg
[npm-url]: https://www.npmjs.com/package/@kenote/config
[downloads-image]: https://img.shields.io/npm/dm/@kenote/config.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/config
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## 使用方法

`data/config.yaml`
```yaml
host: localhost

port: 3000

site_name: 站点名称

redis:
  host: 127.0.0.1
  port: 6379
  db: 0
```

`data/index.js`
```js
module.exports = {
  a: 1
}
```

`app.ts`
```ts
import { loadConfig, asyncRequire } from '@kenote/config'

/**
 * 读取配置文件
 */
const config = loadConfig('data')
/**
 * 异步导入JS
 */
const ct = asyncRequire('./data')
```

---
MIT License.