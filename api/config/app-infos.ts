import Env from '@ioc:Adonis/Core/Env'
export default {
  color: Env.get('APP_COLOR', '#8472F3'),
  name: Env.get('APP_NAME', 'My App'),
  logo: Env.get('APP_LOGO'),
  url: Env.get('APP_URL'),
  domain: Env.get('APP_DOMAIN'),
  emails: {
    noReply: Env.get('APP_EMAIL_NO_REPLY'),
    support: Env.get('APP_EMAIL_SUPPORT'),
  },
}
