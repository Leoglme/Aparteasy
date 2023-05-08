import Mail from '@ioc:Adonis/Addons/Mail'
import type { MailMessage, MailsMessages } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'
import appInfos from 'Config/app-infos'

export default class MailService {
  protected static replyTo = {
    email: appInfos.emails.support,
    name: `${appInfos.name} Team`,
  }

  public static async send({
    email,
    payload,
    subject,
    viewPath = 'emails/test-email',
  }: {
    email: string
    payload?: Record<string, unknown>
    subject?: string
    viewPath?: string
  }): Promise<void> {
    const mail: MailMessage = {
      viewPath,
      from: appInfos.emails.noReply,
      to: email,
      subject: subject,
      replyTo: this.replyTo,
      payload,
    }

    const html = this.getHtml(mail.viewPath, mail.payload)
    await Mail.sendLater((message) => {
      message
        .from(mail.from)
        .to(mail.to)
        .subject(mail.subject || '')
        .replyTo(mail.replyTo.email || mail.to, mail.replyTo.name)
        .html(html)
    })
  }

  public static async sendMany({
    emails,
    payload,
    subject,
    viewPath = 'emails/test-email',
  }: {
    emails: string[]
    payload?: Record<string, unknown>
    subject?: string
    viewPath?: string
  }) {
    const mails: MailsMessages = {
      viewPath,
      from: appInfos.emails.noReply,
      to: emails,
      subject: subject,
      replyTo: {
        email: appInfos.emails.support,
        name: `${appInfos.name} Team`,
      },
      payload,
    }

    const receivers: string[] = []
    const html = this.getHtml(mails.viewPath, mails.payload)
    mails.to.map(async (mail) => {
      if (receivers.includes(mail)) return
      receivers.push(mail)

      await Mail.sendLater((message) => {
        message
          .from(mails.from)
          .to(mail)
          .subject(mails.subject || '')
          .replyTo(mails.replyTo.email || mail, mails.replyTo.name)
          .html(html)
      })
    })
  }

  protected static getHtml(viewPath: string, payload?: Record<string, unknown>): string {
    return mjml(View.renderSync(viewPath, payload)).html
  }
}
