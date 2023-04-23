import Event from '@ioc:Adonis/Core/Event'

/* Web socket notify events */
Event.on('notify:success', 'NotifyListener.onNotifySuccess')
Event.on('notify:error', 'NotifyListener.onNotifyError')
