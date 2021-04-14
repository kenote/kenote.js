import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import Mail from 'nodemailer/lib/mailer'
import async, { RetryOptions } from 'async'
import path from 'path'
import fs from 'fs'
import { template } from 'lodash'
import mjml2html from 'mjml'
import { htmlToText } from 'html-to-text'

import { MailerSetting, renderString } from '..'

export class Mailer {

  private __Transport: Mail

  private __AsyncRetryOptions: number | RetryOptions<any> = { times: 5, interval: 200 }

  private __mailDir: string

  private __RenderString: renderString
  
  constructor (options: MailerSetting) {
    let transport = new SMTPTransport(options.smtpOptions)
    
    this.__Transport = nodemailer.createTransport(transport)
    this.__AsyncRetryOptions = options.asyncRetryOptions ?? { times: 5, interval: 200 }
    this.__mailDir = options.mailDir ?? path.resolve(process.cwd(), 'mails')
    this.__RenderString = options.renderString ?? ((src, context) => template(src)(context))
  }

  /**
   * 异步发送邮件
   * @param mail 
   * @param done 
   */
  public asyncSend (mail: Mail.Options, done?: (err: any, info: any) => void) {
    async.retry(this.__AsyncRetryOptions, async () => {
      try {
        let sentMessageInfo = await this.__Transport.sendMail(mail)
        done && done(null, sentMessageInfo)
      } catch (error) {
        done && done(error, 'Send Mail Error')
      }
    }, err => {
      if (err) {
        return done && done(err, 'Send Mail Finally Error')
      }
      done && done(null, mail)
      return
    })
  }

  /**
   * 渲染邮件模版
   * @param filename 
   * @param context 
   */
  public renderMail (filename: string, context?: Record<string, any>) {
    let extname = path.extname(filename)
    let tplString = ''
    let mjmlFile = path.resolve(this.__mailDir, filename)
    if (!fs.existsSync(mjmlFile) || !/\.(mjml|htm|html|)$/.test(extname)) return tplString
    let mjmlString = fs.readFileSync(mjmlFile, 'utf-8')
    tplString = mjmlString
    if (/\.(mjml)$/.test(extname)) {
      let mjmlParseResults = mjml2html(mjmlString, { })
      tplString = mjmlParseResults.html
      if (mjmlParseResults.errors.length > 0) {
        console.log(mjmlParseResults.errors)
      }
    }
    if (context) {
      tplString = this.__RenderString(tplString, context)
    }
    return tplString
  }

  /**
   * 发送模版邮件
   * @param filename 
   * @param context 
   */
  public sendMail (filename: string, context?: Record<string, any>) {
    let html = this.renderMail(filename, context)
    return (mail: Mail.Options, done?: (err: any, info: any) => void) => {
      mail.html = html
      mail.text = htmlToText(html)
      this.asyncSend(mail, done)
    }
  }
}


export const mailer = (options: MailerSetting) => new Mailer(options)
