import WsService from 'App/Services/WsService'
import { EventsNotify } from '@ioc:Adonis/Core/Event'

export default class NotifyListener {
  private static ws(eventName: string, data: { message: string; socketId: string }) {
    WsService.io.to(data.socketId).emit(eventName, data.message)
  }
  public async onNotifySuccess({ message, socketId }: EventsNotify['notify:success']) {
    NotifyListener.ws('notify:success', { message, socketId })
  }
  public async onNotifyError({ message, socketId }: EventsNotify['notify:error']) {
    NotifyListener.ws('notify:error', { message, socketId })
  }
}
