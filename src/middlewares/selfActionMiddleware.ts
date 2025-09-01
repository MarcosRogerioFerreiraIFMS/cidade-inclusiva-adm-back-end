import { TipoUsuario } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { AuthenticatedRequest } from '../types/RequestTypes'

/**
 * Middleware que verifica se o usuário pode fazer operações de like
 * Garante que usuários só possam dar like/unlike por si mesmos
 */
export const requireSelfLikeAction = (
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
  const loggedUserId = req.user.userId

  // Admin pode fazer like em nome de qualquer usuário (para fins administrativos)
  if (req.user.tipo === TipoUsuario.ADMIN) {
    next()
    return
  }

  // Usuário comum só pode dar like por si mesmo
  if (usuarioId !== loggedUserId) {
    res.status(HttpStatusCode.FORBIDDEN).json({
      success: false,
      error: 'Você só pode dar like/unlike por si mesmo',
      code: 'SELF_ACTION_REQUIRED'
    })
    return
  }

  next()
}

/**
 * Middleware que verifica se o usuário pode visualizar dados específicos de outro usuário
 * Usado para rotas como GET /likes/usuario/:usuarioId
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
  const loggedUserId = req.user.userId

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
