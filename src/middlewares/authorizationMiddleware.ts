import { TipoRecurso, TipoUsuario } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { ComentarioDependencies } from '../dependencies/ComentarioDependencies'
import { LikeDependencies } from '../dependencies/LikeDependencies'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { AuthenticatedRequest } from '../types/RequestTypes'
import { AuditLogger } from '../utils/auditLogger'

/**
 * - Módulo de middlewares de autorização
 * - Implementa verificações de permissões baseadas em roles e propriedade de recursos
 * - Garante que usuários só acessem recursos para os quais têm autorização
 */

/**
 * Middleware que requer roles específicos para acesso
 * @param {TipoUsuario[]} rolesPermitidos - Array de roles que podem acessar o recurso
 */
export const requireRole = (rolesPermitidos: TipoUsuario[]) => {
  return (
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

    if (!rolesPermitidos.includes(req.user.tipo)) {
      // Log de tentativa de acesso não autorizado
      AuditLogger.log(req, {
        acao: 'ACESSO_NEGADO',
        recursoId: req.params.id || req.originalUrl,
        tipoRecurso: TipoRecurso.ENDPOINT,
        dadosNovos: {
          endpoint: req.originalUrl,
          method: req.method,
          userRole: req.user.tipo,
          requiredRoles: rolesPermitidos
        }
      }).catch(console.error)

      res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        error: 'Acesso negado. Permissões insuficientes.',
        code: 'INSUFFICIENT_PERMISSIONS'
      })
      return
    }

    next()
  }
}

/**
 * - Middleware que requer que o usuário seja administrador
 * - Atalho para requireRole([TipoUsuario.ADMIN])
 */
export const requireAdmin = requireRole([TipoUsuario.ADMIN])

/**
 * - Middleware que valida se o usuário pode acessar/modificar o recurso
 * - Administradores podem acessar qualquer recurso
 * - Usuários comuns só podem acessar/modificar seus próprios recursos
 * @param {TipoRecurso} tipoRecurso - Tipo do recurso sendo acessado
 */
export const requireOwnershipOrAdmin = (tipoRecurso: TipoRecurso) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.user) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: 'Usuário não autenticado'
      })
      return
    }

    // Admins podem tudo
    if (req.user.tipo === TipoUsuario.ADMIN) {
      return next()
    }

    const { id: recursoId } = req.params
    const userId = req.user.userId

    try {
      // Verificar propriedade baseado no tipo de recurso
      const isOwner = await verifyOwnership(tipoRecurso, recursoId, userId)

      if (!isOwner) {
        // Log de tentativa de acesso a recurso não próprio
        await AuditLogger.log(req, {
          acao: 'ACESSO_NEGADO_PROPRIEDADE',
          recursoId,
          tipoRecurso,
          dadosNovos: {
            tentativaAcesso: recursoId,
            usuarioTentativa: userId,
            endpoint: req.originalUrl,
            method: req.method
          }
        })

        res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          error: 'Você só pode acessar/modificar seus próprios recursos.',
          code: 'RESOURCE_OWNERSHIP_REQUIRED'
        })
        return
      }

      next()
    } catch (error) {
      console.error('Erro ao verificar propriedade:', error)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Erro interno ao verificar permissões'
      })
    }
  }
}

/**
 * Verifica se o usuário é proprietário do recurso baseado no tipo
 * @param {TipoRecurso} tipoRecurso - Tipo do recurso a ser verificado
 * @param {string} recursoId - ID do recurso
 * @param {string} userId - ID do usuário
 * @returns {Promise<boolean>} True se o usuário for proprietário, false caso contrário
 */
async function verifyOwnership(
  tipoRecurso: TipoRecurso,
  recursoId: string,
  userId: string
): Promise<boolean> {
  switch (tipoRecurso) {
    case TipoRecurso.USUARIO: {
      // Para usuários, o ID do recurso deve ser igual ao ID do usuário
      return recursoId === userId
    }

    case TipoRecurso.COMENTARIO: {
      // Para comentários, verificar se o usuário é o autor
      const comentario = await ComentarioDependencies.repository.isCommentOwner(
        recursoId,
        userId
      )
      return comentario
    }

    case TipoRecurso.LIKE: {
      // Para likes, verificar se o usuário é o autor
      const like = await LikeDependencies.repository.isLikeOwner(
        recursoId,
        userId
      )
      return like
    }

    default:
      return false
  }
}
