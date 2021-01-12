# @kenote/mailer

发送邮件模块。

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