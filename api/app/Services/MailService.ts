import Mail, { BaseMailer } from '@ioc:Adonis/Addons/Mail'
import type { MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'
import Mailjet from 'node-mailjet'
import type { LibraryResponse } from 'node-mailjet'
import Logger from '@ioc:Adonis/Core/Logger'
import appInfos from 'Config/app-infos'
import type { RequestData } from 'node-mailjet/declarations/request/Request'

type MailReplayTo = {
  email: string
  name: string
}

interface BaseMailPayload {
  payload?: Record<string, unknown>
  subject?: string
  viewPath?: string
}

interface MailPayload extends BaseMailPayload {
  email: string
}

interface MailManyPayload extends BaseMailPayload {
  emails: string[]
}

export default class MailService extends BaseMailer {
  protected static replyTo: MailReplayTo = {
    email: appInfos.emails.support,
    name: `${appInfos.name} Team`,
  }

  public static async send({
    email,
    payload,
    subject,
    viewPath = 'emails/test-email',
  }: MailPayload): Promise<void> {
    const html: string = this.getHtml(viewPath, payload)

    const isProduction: boolean = Env.get('NODE_ENV') === 'production'

    if (isProduction) {
      // Use Mailjet in production
      this.sendMailWithMailjet({ email, payload, subject, viewPath })
    } else {
      // Use the classic operation of Adonis Mail in development
      await Mail.sendLater((message: MessageContract): void => {
        message
          .from(appInfos.emails.noReply)
          .to(email)
          .subject(subject || '')
          .replyTo(this.replyTo.email, this.replyTo.name)
          .html(html)
      })
    }
  }

  public static async sendMany({
    emails,
    payload,
    subject,
    viewPath = 'emails/test-email',
  }: MailManyPayload): Promise<void> {
    const uniqueEmails: string[] = [...new Set(emails)]

    for (const email of uniqueEmails) {
      await this.send({ email, payload, subject, viewPath })
    }
  }

  public static sendMailWithMailjet({
    email,
    payload,
    subject,
    viewPath = 'emails/test-email',
  }: MailPayload): void {
    const html: string = this.getHtml(viewPath, payload)

    const mailjet: Mailjet = new Mailjet({
      apiKey: Env.get('MAILJET_API_KEY'),
      apiSecret: Env.get('MAILJET_API_SECRET_KEY'),
    })

    const request: Promise<LibraryResponse<RequestData>> = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: appInfos.emails.noReply,
              Name: this.replyTo.name,
            },
            To: [{ Email: email }],
            Subject: subject,
            HTMLPart: html,
            ReplyTo: {
              Email: this.replyTo.email,
              Name: this.replyTo.name,
            },
          },
        ],
      })

    request
      .then((result: LibraryResponse<RequestData>): void => {
        Logger.info('Mail sent successfully with Mailjet:', JSON.stringify(result.body))
      })
      .catch((error): void => {
        Logger.error('Error sending mail with Mailjet:', JSON.stringify(error.statusCode))
      })
  }

  protected static getHtml(viewPath: string, payload?: Record<string, unknown>): string {
    return mjml(View.renderSync(viewPath, payload)).html
  }
}
