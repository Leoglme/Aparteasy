import Mail from '@ioc:Adonis/Addons/Mail'
import Logger from '@ioc:Adonis/Core/Logger'

Mail.monitorQueue((error) => {
  if (error) {
    return Logger.error(error, "Impossible d'envoyer un e-mail")
  }
  return Logger.info("Mail ajouté à la file d'attente")
})
