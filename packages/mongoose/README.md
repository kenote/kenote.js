# @kenote/mongoose

辅助 `mongoose` 操作 `mongoDB` 数据库，需要预先安装 `mongoose` 

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/mongoose.svg
[npm-url]: https://www.npmjs.com/package/@kenote/mongoose
[downloads-image]: https://img.shields.io/npm/dm/@kenote/mongoose.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/mongoose
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## 使用方法

```ts
import { model, Schema } from 'mongoose'
import { modelDao } from '@kenote/mongoose'

const userModel = model('user', new Schema({
  id: {
    type: Number,
    default: 0,
    index: { unique: true }
  },
  username: {
    type: String,
    required: true
  }
}))

modelDao(userModel, {
  select: ['username'],
  populate: {
    path: ''
  },
  sort: { _id: 1 },
  limit: 10
})

```

---
MIT License.