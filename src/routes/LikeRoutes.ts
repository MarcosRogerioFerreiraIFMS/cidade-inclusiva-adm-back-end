import { Router } from 'express'
import { LikeDependencies } from '../dependencies/LikeDependencies'
import { likeOperations } from '../middlewares/compositeAuthMiddleware'

/**
 * - Router para rotas de likes
 * - Define endpoints para gerenciamento de likes em comentários
 * - Inclui middleware de autenticação e autorização apropriados
 */
const LikeRoutes = Router()

/**
 * PATCH /likes/toggle/:usuarioId/:comentarioId - Alterna like em comentário
 * Cria like se não existir, remove se já existir
 * Requer autenticação do usuário
 */
LikeRoutes.patch(
  '/toggle/:usuarioId/:comentarioId',
  ...likeOperations.toggle,
  LikeDependencies.controller.toggle
)

/**
 * GET /likes/:id - Busca like por ID
 * Requer autenticação para visualização
 */
LikeRoutes.get(
  '/:id',
  ...likeOperations.view,
  LikeDependencies.controller.findById
)

/**
 * DELETE /likes/:id - Remove like existente
 * Requer autenticação e autorização (próprio usuário)
 */
LikeRoutes.delete(
  '/:id',
  ...likeOperations.delete,
  LikeDependencies.controller.delete
)

/**
 * GET /likes/comentario/:comentarioId - Lista likes de um comentário
 * Público, sem necessidade de autenticação
 */
LikeRoutes.get(
  '/comentario/:comentarioId',
  ...likeOperations.findByComment,
  LikeDependencies.controller.findByComentario
)

/**
 * GET /likes/usuario/:usuarioId - Lista likes de um usuário
 * Requer autenticação para visualização
 */
LikeRoutes.get(
  '/usuario/:usuarioId',
  ...likeOperations.findByUser,
  LikeDependencies.controller.findByUsuario
)

export { LikeRoutes }
