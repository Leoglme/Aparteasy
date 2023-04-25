import Mail from '@ioc:Adonis/Addons/Mail'
import Logger from '@ioc:Adonis/Core/Logger'

Mail.monitorQueue((error) => {
  if (error) {
    return Logger.error(error, 'Unable to send email')
  }
  return Logger.info('Mail added to queue')
})
