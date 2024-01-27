import Env from '@ioc:Adonis/Core/Env'
import { mailConfig } from '@adonisjs/mail/build/config'

export default mailConfig({
  mailer: 'smtp',
  mailers: {
    smtp: {
      driver: 'smtp',
      pool: true,
      host: Env.get('SMTP_HOST'),
      port: Env.get('SMTP_PORT'),
      auth: {
        user: Env.get('SMTP_USERNAME'),
        pass: Env.get('SMTP_PASSWORD'),
        type: 'login',
      },
    },
  },
})
