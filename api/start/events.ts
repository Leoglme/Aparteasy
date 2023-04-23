import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'

/*Events files*/
// import './events/app'
// import './events/auth'
// import './events/mail'
// import './events/notify'

/* listen for event errors */
Event.onError((event, error, eventData) => {
  console.log({ event, error, eventData })
  Logger.error({ event, error, eventData }, 'Event error')
})
