import Env from '@ioc:Adonis/Core/Env'
export default {
  color: Env.get('APP_PRIMARY_COLOR', '#db0a61'),
  name: Env.get('APP_NAME', 'ApartEasy'),
  logo: Env.get('APP_LOGO'),
  url: Env.get('APP_URL'),
  domain: Env.get('APP_DOMAIN'),
  emails: {
    noReply: Env.get('APP_EMAIL_NO_REPLY'),
    support: Env.get('APP_EMAIL_SUPPORT'),
  },
}
