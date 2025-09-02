import { NextFunction, Request, Response } from 'express'
import { HandleError } from '../utils/HandleError'
import { HttpError } from '../utils/HttpError'

/**
 * - Middleware global para tratamento de erros da aplicação
 * - Captura todos os erros não tratados e formata a resposta adequadamente
 * @param {Error | HttpError | unknown} err - Erro capturado
 * @param {Request} _req - Request do Express (não utilizado)
 * @param {Response} res - Response do Express para enviar a resposta de erro
 * @param {NextFunction} _next - NextFunction do Express (não utilizado)
 */
export const globalErrorHandler = (
  err: Error | HttpError | unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  HandleError.handleError(res, err)
}
