# @kenote/config

读取配置文件模块，配置文件使用 `json` 或 `yaml`

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