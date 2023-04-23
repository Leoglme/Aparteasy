import HttpContext from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HttpService {
  protected static ctx: HttpContextContract

  constructor() {
    HttpService.ctx = HttpContext.getOrFail()
  }

  protected static send(content: unknown, code = 200) {
    return this.response.status(code).send(content)
  }

  protected static get response() {
    return this.ctx.response
  }
  protected static get request() {
    return this.ctx.request
  }
  protected static get auth() {
    return this.ctx.auth
  }
}
