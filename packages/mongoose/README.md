# @kenote/mongoose

辅助 `mongoose` 操作 `mongoDB` 数据库，需要预先安装 `mongoose` 模块。

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