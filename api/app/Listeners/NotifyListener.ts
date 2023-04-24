import WsService from 'App/Services/WsService'
import { EventsNotify } from '@ioc:Adonis/Core/Event'

export default class NotifyListener {
  private ws(eventName: string, message: string) {
    WsService.io.emit(eventName, message)
  }
  public async onNotifySuccess(message: EventsNotify['notify:success']) {
    this.ws('notify:success', message)
  }
  public async onNotifyError(message: EventsNotify['notify:error']) {
    this.ws('notify:error', message)
  }
}
