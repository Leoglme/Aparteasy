import WsService from 'App/Services/WsService'
import { EventsNotify } from '@ioc:Adonis/Core/Event'

export default class NotifyListener {
  private static ws(eventName: string, message: string) {
    WsService.io.emit(eventName, message)
  }
  public async onNotifySuccess(message: EventsNotify['notify:success']) {
    NotifyListener.ws('notify:success', message)
  }
  public async onNotifyError(message: EventsNotify['notify:error']) {
    NotifyListener.ws('notify:error', message)
  }
}
