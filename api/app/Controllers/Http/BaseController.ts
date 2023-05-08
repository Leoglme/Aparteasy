import HttpService from 'App/Services/HttpService'
import BaseService from 'App/Services/BaseService'

export default class BaseController extends BaseService {
  protected send(content: unknown, code = 200) {
    return HttpService.send(content, code)
  }

  protected async sendPrivateErrorNotification(message: string) {
    await BaseService.sendPrivateErrorNotification(message)
  }

  protected async sendPrivateSocketEvent(payload: { [key: string]: unknown }, eventName: string) {
    await BaseService.sendPrivateSocketEvent(payload, eventName)
  }

  protected sendError(message: string, code = 200) {
    return HttpService.sendError(message, code)
  }

  protected get auth() {
    return HttpService.auth
  }
}
