import { NextFunction, Request, Response } from 'express'
import { HandleError } from '../utils/HandleError'
import { HttpError } from '../utils/HttpError'

export const globalErrorHandler = (
  err: Error | HttpError | unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  HandleError.handleError(res, err)
}
