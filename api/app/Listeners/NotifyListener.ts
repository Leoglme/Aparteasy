import WsService from 'App/Services/WsService'

export default class NotifyListener {
  private ws(eventName: string, message: string) {
    WsService.io.emit(eventName, message)
  }
  public async onNotifySuccess(message: string) {
    this.ws('notify:success', message)
  }
  public async onNotifyError(message: string) {
    this.ws('notify:error', message)
  }
}
