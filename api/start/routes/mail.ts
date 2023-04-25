import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('mail', 'MailController.send').as('sendMail')
  Route.post('mails', 'MailController.sendMany').as('sendMails')
}).prefix('/api/')
