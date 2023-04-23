import Event from '@ioc:Adonis/Core/Event'

Event.on('new:user', 'AuthListener.onNewUser')
Event.on('login', 'AuthListener.onLogin')
