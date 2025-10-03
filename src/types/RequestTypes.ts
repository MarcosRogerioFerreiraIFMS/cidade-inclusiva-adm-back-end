import type { UsuarioCompletions } from '@/types'
import type { NextFunction, Request, Response } from 'express'

/**
 * Interface que estende Request do Express para incluir dados do usuário autenticado
 * Utilizada em middlewares de autenticação e controllers que requerem usuário logado
 */
export interface AuthenticatedRequest extends Request {
  /** Dados completos do usuário autenticado obtidos do banco de dados */
  user?: UsuarioCompletions
}

/**
 * Tipo genérico para functions de controller
 * Define a assinatura padrão dos métodos de controller com suporte a tipos customizados de Request
 * @template TReq - Tipo do Request (padrão: Request)
 */
export type ControllerRequest<TReq extends Request = Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => Promise<void>
