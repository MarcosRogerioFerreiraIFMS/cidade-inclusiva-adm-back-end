import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from '../utils/HttpError'

export const validateUUID = (paramName: string = 'id') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const paramValue = req.params[paramName]

    if (!paramValue) {
      return next(
        new HttpError(
          `Parâmetro ${paramName} é obrigatório`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!uuidRegex.test(paramValue)) {
      return next(
        new HttpError(
          `${paramName} deve ser um UUID válido`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}

export const validateRequiredBody = (requiredFields: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const missingFields = requiredFields.filter(
      (field) =>
        req.body === undefined ||
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ''
    )

    if (missingFields.length > 0) {
      return next(
        new HttpError(
          `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
          HttpStatusCode.BAD_REQUEST
        )
      )
    }

    next()
  }
}
