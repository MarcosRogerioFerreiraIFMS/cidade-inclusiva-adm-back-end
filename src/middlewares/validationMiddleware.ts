import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums'
import { HttpError } from '../utils/HttpError'

/**
 * Middleware para validação de UUID em parâmetros da rota
 * @param {string} paramName - Nome do parâmetro a ser validado (padrão: 'id')
 */
export const validateUUID = (paramName: string = 'id') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const paramValue = req.params[paramName]

    if (!paramValue) {
      return next(
        new HttpError(
          `Parâmetro '${paramName}' é obrigatório.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!uuidRegex.test(paramValue)) {
      return next(
        new HttpError(
          `'${paramName}' deve ser um UUID válido (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}

/**
 * Middleware para validação de campos obrigatórios no corpo da requisição
 * @param {string[]} requiredFields - Array com nomes dos campos obrigatórios
 */
export const validateRequiredBody = (requiredFields: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.body || typeof req.body !== 'object') {
      return next(
        new HttpError(
          'O corpo da requisição deve ser um objeto JSON válido.',
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    const missingFields = requiredFields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        (typeof req.body[field] === 'string' && req.body[field].trim() === '')
    )

    if (missingFields.length > 0) {
      return next(
        new HttpError(
          `Campos obrigatórios ausentes ou vazios: ${missingFields.join(
            ', '
          )}.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}

/**
 * Middleware para validação do Content-Type da requisição
 * @param {string} expectedType - Tipo de conteúdo esperado (padrão: 'application/json')
 */
export const validateContentType = (
  expectedType: string = 'application/json'
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const contentType = req.headers['content-type']

    if (!contentType || !contentType.includes(expectedType)) {
      return next(
        new HttpError(
          `Content-Type deve ser '${expectedType}'. Recebido: '${
            contentType || 'não informado'
          }'.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}

/**
 * Middleware para validação do tamanho da requisição
 * @param {number} maxSizeInMB - Tamanho máximo em MB (padrão: 10)
 */
export const validateRequestSize = (maxSizeInMB: number = 10) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10)
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024

    if (contentLength > maxSizeInBytes) {
      return next(
        new HttpError(
          `O tamanho da requisição (${(contentLength / 1024 / 1024).toFixed(
            2
          )}MB) excede o limite permitido de ${maxSizeInMB}MB.`,
          HttpStatusCode.PAYLOAD_TOO_LARGE
        )
      )
    }

    next()
  }
}

/**
 * Middleware para validação de parâmetros de consulta permitidos
 * @param {string[]} allowedParams - Array com parâmetros permitidos
 */
export const validateQueryParams = (allowedParams: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const queryKeys = Object.keys(req.query)
    const invalidParams = queryKeys.filter(
      (key) => !allowedParams.includes(key)
    )

    if (invalidParams.length > 0) {
      return next(
        new HttpError(
          `Parâmetros de consulta inválidos: ${invalidParams.join(
            ', '
          )}. Parâmetros permitidos: ${allowedParams.join(', ')}.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}

/**
 * Middleware para validação de parâmetros numéricos
 * @param {string} paramName - Nome do parâmetro a ser validado
 * @param {number} min - Valor mínimo permitido (opcional)
 * @param {number} max - Valor máximo permitido (opcional)
 */
export const validateNumericParam = (
  paramName: string,
  min?: number,
  max?: number
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const paramValue = req.params[paramName] || req.query[paramName]

    if (!paramValue) {
      return next(
        new HttpError(
          `Parâmetro numérico '${paramName}' é obrigatório.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    const numValue = Number(paramValue)

    if (isNaN(numValue)) {
      return next(
        new HttpError(
          `'${paramName}' deve ser um número válido. Recebido: '${paramValue}'.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    if (min !== undefined && numValue < min) {
      return next(
        new HttpError(
          `'${paramName}' deve ser maior ou igual a ${min}. Recebido: ${numValue}.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    if (max !== undefined && numValue > max) {
      return next(
        new HttpError(
          `'${paramName}' deve ser menor ou igual a ${max}. Recebido: ${numValue}.`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}
