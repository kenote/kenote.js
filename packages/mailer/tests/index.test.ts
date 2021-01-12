import { Mailer } from '../src'
import path from 'path'
import { renderString } from 'nunjucks'
import isHtml from 'is-html'

const mailer = new Mailer({
  smtpOptions: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'penelope.leuschke41@ethereal.email',
      pass: 'aPxRSFBXbM7dseEwKK'
    }
  },
  mailDir: path.resolve(process.cwd(), 'mails'),
  renderString
})

describe('\nMailer Test\n', () => {

  test('asyncSend Mail', () => {
    mailer.asyncSend({
      from: 'penelope.leuschke41@ethereal.email',
      to: 'penelope.leuschke41@ethereal.email',
      subject: 'Ethereal Email',
      text: 'Ethereal Email.'
    }, callback)
  })

  test('renderMail to HTML', () => {
    let html = mailer.renderMail('email_verify.mjml', {
      site_name: 'Kenote',
      username: 'thondery',
      email_verify_url: 'http://localhost:8080'
    })
    expect(isHtml(html)).toBe(true)
  })

  test('asyncSend Mail', () => {
    mailer.sendMail('email_verify.mjml', {
      site_name: 'Kenote',
      username: 'thondery',
      email_verify_url: 'http://localhost:8080'
    })({
      from: 'penelope.leuschke41@ethereal.email',
      to: 'penelope.leuschke41@ethereal.email',
      subject: 'Ethereal Email'
    }, callback)
  })
})

function callback (err, info) {
  expect(err).toBe(null)
}