import Event from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { MailCommand, MailMessage } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'
import appInfos from 'Config/app-infos'

export default class MailService {
  protected static replyTo = {
    email: appInfos.emails.support,
    name: `${appInfos.name} Team`,
  }
  public static async send(payload: MailCommand, viewPath: string = 'emails.test-email') {
    const mail: MailMessage = {
      viewPath,
      from: appInfos.emails.noReply,
      to: payload.email,
      subject: payload.subject,
      replyTo: this.replyTo,
      payload,
    }

    const html = mjml(View.renderSync(mail.viewPath, mail.payload)).html
    await Mail.sendLater((message) => {
      message
        .from(mail.from)
        .to(mail.to)
        .subject(mail.subject || '')
        .replyTo(mail.replyTo.email || mail.to, mail.replyTo.name)
        .html(html)
    })
    await Event.emit('mail:send', mail.to)
  }
}
