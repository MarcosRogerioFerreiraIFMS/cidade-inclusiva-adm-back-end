import { ComentarioDependencies } from '@/dependencies/ComentarioDependencies'
import { LikeDependencies } from '@/dependencies/LikeDependencies'
import { MobilidadeDependencies } from '@/dependencies/MobilidadeDependencies'
import { UsuarioDependencies } from '@/dependencies/UsuarioDependencies'
import { HttpStatusCode, TipoRecurso, UsuarioTipo } from '@/enums'
import type { AuthenticatedRequest } from '@/types'
import type { NextFunction, Response } from 'express'

/**
 * - Módulo de middlewares de autorização
 * - Implementa verificações de permissões baseadas em roles e propriedade de recursos
 * - Garante que usuários só acessem recursos para os quais têm autorização
 */

/**
 * Middleware que requer roles específicos para acesso
 * @param {UsuarioTipo[]} rolesPermitidos - Array de roles que podem acessar o recurso
 */
export const requireRole = (rolesPermitidos: UsuarioTipo[]) => {
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
 * - Atalho para requireRole([UsuarioTipo.ADMIN])
 */
export const requireAdmin = requireRole([UsuarioTipo.ADMIN])

/**
 * - Middleware que valida se o usuário pode visualizar o recurso
 * - Administradores podem visualizar qualquer recurso (incluindo outros admins)
 * - Usuários comuns só podem visualizar seus próprios recursos
 * @param {TipoRecurso} tipoRecurso - Tipo do recurso sendo acessado
 */
export const requireOwnershipOrAdminForView = (tipoRecurso: TipoRecurso) => {
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

    const { id: recursoId } = req.params
    const userId = req.user.id

    // Para recursos de usuário, verificar se é o próprio usuário
    if (tipoRecurso === TipoRecurso.USUARIO && recursoId === userId) {
      next()
      return
    }

    // Se for admin, pode visualizar qualquer recurso (incluindo outros admins)
    if (req.user.tipo === UsuarioTipo.ADMIN) {
      next()
      return
    }

    try {
      // Verificar propriedade baseado no tipo de recurso
      const isOwner = await verifyOwnership(tipoRecurso, recursoId, userId)

      if (!isOwner) {
        res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          error: 'Você só pode visualizar seus próprios recursos.',
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
 * - Middleware que valida se o usuário pode modificar o recurso
 * - Administradores podem modificar qualquer recurso, EXCETO outros admins
 * - Usuários comuns só podem modificar seus próprios recursos
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

    const { id: recursoId } = req.params
    const userId = req.user.id

    // Para recursos de usuário, verificar se é o próprio usuário
    if (tipoRecurso === TipoRecurso.USUARIO && recursoId === userId) {
      next()
      return
    }

    // Se for admin, verificar regras especiais
    if (req.user.tipo === UsuarioTipo.ADMIN) {
      // Para operações em usuários, verificar se o alvo não é outro admin
      if (tipoRecurso === TipoRecurso.USUARIO) {
        try {
          // Buscar o usuário alvo para verificar se é admin
          const targetUser = await verifyUserIsAdmin(recursoId)

          if (targetUser) {
            res.status(HttpStatusCode.FORBIDDEN).json({
              success: false,
              error:
                'Administradores não podem modificar o perfil de outros administradores.',
              code: 'ADMIN_CANNOT_MODIFY_ADMIN'
            })
            return
          }

          // Se não é admin, permite
          next()
          return
        } catch (error) {
          console.error('Erro ao verificar tipo de usuário:', error)
          res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: 'Erro interno ao verificar permissões'
          })
          return
        }
      }

      // Para outros recursos, admin pode tudo
      next()
      return
    }

    try {
      // Verificar propriedade baseado no tipo de recurso
      const isOwner = await verifyOwnership(tipoRecurso, recursoId, userId)

      if (!isOwner) {
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
      return comentario ?? false
    }

    case TipoRecurso.LIKE: {
      // Para likes, verificar se o usuário é o autor
      const like = await LikeDependencies.repository.isLikeOwner(
        recursoId,
        userId
      )
      return like ?? false
    }

    case TipoRecurso.MOBILIDADE: {
      // Para mobilidades, verificar se o usuário é o proprietário
      const mobilidade =
        await MobilidadeDependencies.repository.isMobilidadeOwner(
          recursoId,
          userId
        )
      return mobilidade ?? false
    }

    default:
      return false
  }
}

/**
 * Verifica se um usuário é administrador
 * @param {string} userId - ID do usuário a ser verificado
 * @returns {Promise<boolean>} True se o usuário for admin, false caso contrário
 */
async function verifyUserIsAdmin(userId: string): Promise<boolean> {
  const user = await UsuarioDependencies.dao.findById(userId)
  return user?.tipo === UsuarioTipo.ADMIN
}

/**
 * - Middleware que valida se o usuário é proprietário do recurso
 * - NÃO permite acesso de administradores (diferente de requireOwnershipOrAdmin)
 * - Usado quando queremos garantir que apenas o dono do recurso pode acessá-lo
 * @param {TipoRecurso} tipoRecurso - Tipo do recurso sendo acessado
 */
export const requireOwnershipOnly = (tipoRecurso: TipoRecurso) => {
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

    const { id: recursoId } = req.params
    const userId = req.user.id

    try {
      // Verificar propriedade baseado no tipo de recurso
      const isOwner = await verifyOwnership(tipoRecurso, recursoId, userId)

      if (!isOwner) {
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
