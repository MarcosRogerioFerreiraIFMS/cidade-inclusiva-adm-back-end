import { HttpStatusCode, TipoUsuario } from '@/enums'
import type { AuthenticatedRequest } from '@/types'
import type { NextFunction, Response } from 'express'

/**
 * - Middleware que verifica se o usuário pode visualizar dados específicos de outro usuário
 * - Usado para rotas como GET /likes/usuario/:usuarioId
 * - Administradores podem ver dados de qualquer usuário, usuários comuns apenas seus próprios dados
 * @param {AuthenticatedRequest} req - Requisição autenticada contendo dados do usuário
 * @param {Response} res - Resposta HTTP
 * @param {NextFunction} next - Função para continuar ao próximo middleware
 * @returns {void}
 */
export const requireSelfOrAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      error: 'Usuário não autenticado'
    })
    return
  }

  const { usuarioId } = req.params
  const loggedUserId = req.user.id

  // Admin pode ver dados de qualquer usuário
  if (req.user.tipo === TipoUsuario.ADMIN) {
    next()
    return
  }

  // Usuário comum só pode ver seus próprios dados
  if (usuarioId !== loggedUserId) {
    res.status(HttpStatusCode.FORBIDDEN).json({
      success: false,
      error: 'Você só pode visualizar seus próprios dados',
      code: 'SELF_DATA_ONLY'
    })
    return
  }

  next()
}
