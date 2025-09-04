import { HttpStatusCode } from '../enums'

/**
 * Classe de erro personalizada para operações HTTP
 * Estende Error nativo do JavaScript para incluir status codes HTTP
 */
export class HttpError extends Error {
  /** Código de status HTTP associado ao erro */
  statusCode: HttpStatusCode

  /**
   * @param {string} message - Mensagem de erro descritiva
   * @param {HttpStatusCode} statusCode - Código de status HTTP (padrão: 500)
   */
  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  /**
   * Serializa o erro para formato JSON
   * @returns {Object} Representação JSON do erro
   */
  toJSON(): {
    name: string
    message: string
    statusCode: HttpStatusCode
    stack?: string | undefined
  } {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      stack: this.stack
    }
  }
}
