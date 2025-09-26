import { HttpStatusCode } from '@/enums'
import type { NextFunction, Request, Response } from 'express'

export function onlyJson(req: Request, res: Response, next: NextFunction) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(HttpStatusCode.UNSUPPORTED_MEDIA_TYPE).json({
        error: "Content-Type deve ser 'application/json'."
      })
    }
  }
  return next()
}
