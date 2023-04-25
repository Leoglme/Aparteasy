/**
 * Contract source: https://git.io/JvgAT
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { InferMailersFromConfig } from '@adonisjs/mail/build/config'
import mailConfig from '../config/mail'

declare module '@ioc:Adonis/Addons/Mail' {
  interface MailersList extends InferMailersFromConfig<typeof mailConfig> {}
  interface MailPayload {
    email: string
    message: string
  }
  interface MailCommand extends MailPayload {
    subject?: string
  }
  interface MailMessage {
    viewPath: string
    from: string
    to: string
    subject?: string
    replyTo: {
      email?: string
      name?: string
    }
    payload: MailPayload
  }
  interface MailsMessages extends Omit<MailMessage, 'to'> {
    to: string[]
  }
}
