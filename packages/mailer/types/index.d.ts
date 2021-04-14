import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { RetryOptions } from 'async'
import { Mailer } from '../src'

export declare interface MailerSetting {
  /**
   * Mail SMTP 选项
   */
  smtpOptions          : SMTPTransport.Options
  /**
   * 模版路径
   */
  mailDir             ?: string
  /**
   * 模版渲染函数
   */
  renderString        ?: renderString
  /**
   * 异步重试选项
   */
  asyncRetryOptions   ?: number | RetryOptions<any>
}

export declare type renderString = (src: string, context: any) => string

export declare const mailer: (options: MailerSetting) => Mailer

export { Mailer }