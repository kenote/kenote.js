# @kenote/mailer

发送邮件模块。

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/mailer.svg
[npm-url]: https://www.npmjs.com/package/@kenote/mailer
[downloads-image]: https://img.shields.io/npm/dm/@kenote/mailer.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/mailer
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## 使用方法
```ts
import { Mailer } from '@kenote/mailer'
import { renderString } from 'nunjucks'

const mailer = new Mailer({
  // SMTP 选项
  smtpOptions: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'penelope.leuschke41@ethereal.email',
      pass: 'aPxRSFBXbM7dseEwKK'
    }
  },
  // 邮件模版目录
  mailDir: path.resolve(process.cwd(), 'mails'),
  // 渲染模版函数
  renderString
})

const mail = {
  from: 'penelope.leuschke41@ethereal.email',
  to: 'penelope.leuschke41@ethereal.email',
  subject: 'Ethereal Email',
}

const context = {
  site_name: 'Kenote',
  username: 'thondery',
  email_verify_url: 'http://localhost:8080'
}

// 发送邮件
mailer.asyncSend(mail)
// 发送模版邮件
mailer.sendMail('email_verify.mjml', context)(mail)
```

---
MIT License.