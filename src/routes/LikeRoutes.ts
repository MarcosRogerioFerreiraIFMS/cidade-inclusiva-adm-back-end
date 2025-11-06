import { LikeDependencies } from '@/dependencies/LikeDependencies'
import {
  contentCreationRateLimit,
  likeOperations,
  modificationRateLimit,
  readOperationsRateLimit
} from '@/middlewares'
import { Router } from 'express'

/**
 * - Router para rotas de likes
 * - Define endpoints para gerenciamento de likes em comentários
 * - Inclui middleware de autenticação e autorização apropriados
 */
const LikeRoutes = Router()

/**
 * PATCH /likes/toggle/:comentarioId - Alterna like em comentário
 * Cria like se não existir, remove se já existir
 * Requer autenticação do usuário
 */
LikeRoutes.patch(
  '/toggle/:comentarioId',
  contentCreationRateLimit,
  ...likeOperations.toggle,
  LikeDependencies.controller.toggle
)

/**
 * GET /likes/:id - Busca like por ID
 * Requer autenticação para visualização
 */
LikeRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...likeOperations.view,
  LikeDependencies.controller.findById
)

/**
 * DELETE /likes/:id - Remove like existente
 * Requer autenticação e autorização (próprio usuário)
 */
LikeRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...likeOperations.delete,
  LikeDependencies.controller.delete
)

/**
 * GET /likes/comentario/:comentarioId - Lista likes de um comentário
 * Público, sem necessidade de autenticação
 */
LikeRoutes.get(
  '/comentario/:comentarioId',
  readOperationsRateLimit,
  ...likeOperations.findByComment,
  LikeDependencies.controller.findByComentario
)

/**
 * GET /likes/usuario/:usuarioId - Lista likes de um usuário
 * Requer autenticação para visualização
 */
LikeRoutes.get(
  '/usuario/:usuarioId',
  readOperationsRateLimit,
  ...likeOperations.findByUser,
  LikeDependencies.controller.findByUsuario
)

export { LikeRoutes }
