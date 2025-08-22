import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from '../utils/HttpError'

export const requestTimeout = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now()

    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        const elapsedTime = Date.now() - startTime
        console.error(
          `Timeout na requisição ${req.method} ${req.path} após ${elapsedTime}ms`
        )

        const error = new HttpError(
          `Tempo limite da requisição excedido (${timeoutMs}ms). A operação demorou muito para ser concluída. Tente novamente ou entre em contato com o suporte se o problema persistir.`,
          HttpStatusCode.REQUEST_TIMEOUT
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

    res.on('error', () => {
      clearTimeout(timeout)
    })

    res.setHeader('X-Request-Timeout', timeoutMs.toString())

    next()
  }
}
