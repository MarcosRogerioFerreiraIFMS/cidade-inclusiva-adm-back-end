import { HttpStatusCode } from '../enums/HttpStatusCode'

export class HttpError extends Error {
  statusCode: HttpStatusCode

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      stack: this.stack
    }
  }
}
