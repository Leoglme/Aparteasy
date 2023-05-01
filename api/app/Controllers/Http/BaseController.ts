import HttpService from 'App/Services/HttpService'

export default class BaseController extends HttpService {
  protected send(content: unknown, code = 200) {
    return HttpService.send(content, code)
  }

  protected sendError(message: string, code = 200) {
    return HttpService.sendError(message, code)
  }

  protected get auth() {
    return HttpService.auth
  }
}
