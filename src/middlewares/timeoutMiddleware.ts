import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from '../utils/HttpError'

export const requestTimeout = (timeoutMs: number = 30000) => {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        const error = new HttpError(
          'Tempo limite da requisição excedido',
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
        next(error)
      }
    }, timeoutMs)

    res.on('finish', () => {
      clearTimeout(timeout)
    })

    res.on('close', () => {
      clearTimeout(timeout)
    })

    next()
  }
}
