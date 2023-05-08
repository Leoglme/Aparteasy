import HttpService from 'App/Services/HttpService'
import Event from '@ioc:Adonis/Core/Event'
export default class BaseService extends HttpService {
  protected static async sendPrivateSocketEvent(
    payload: { [key: string]: unknown },
    eventName: string
  ) {
    const socketId = this.request.header('socketId')
    await Event.emit(eventName, { ...payload, socketId })
  }
  protected static async sendPrivateErrorNotification(message: string) {
    await this.sendPrivateSocketEvent({ message }, 'notify:error')
  }
  protected static async sendPrivateSuccessNotification(message: string) {
    await this.sendPrivateSocketEvent({ message }, 'notify:success')
  }

  protected static async sendError(message: string, code = 200) {
    await this.sendPrivateErrorNotification(message)
    return super.sendError(message, code)
  }
}
