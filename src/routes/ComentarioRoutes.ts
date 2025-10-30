import { ComentarioDependencies } from '@/dependencies/ComentarioDependencies'
import {
  comentarioOperations,
  contentCreationRateLimit,
  modificationRateLimit,
  readOperationsRateLimit
} from '@/middlewares'
import { Router } from 'express'

/**
 * - Router para rotas de comentários
 * - Define todos os endpoints CRUD para gerenciamento de comentários
 * - Inclui middleware de autenticação e autorização apropriados
 */
const ComentarioRoutes = Router()

/**
 * POST /comentarios - Cria um novo comentário
 * Requer autenticação do usuário
 */
ComentarioRoutes.post(
  '/',
  contentCreationRateLimit,
  ...comentarioOperations.create,
  ComentarioDependencies.controller.create
)

/**
 * GET /comentarios/:id - Busca comentário por ID
 * Requer autenticação para visualização
 */
ComentarioRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...comentarioOperations.view,
  ComentarioDependencies.controller.findById
)

/**
 * PUT /comentarios/:id - Atualiza comentário existente
 * Requer autenticação e autorização (próprio usuário)
 */
ComentarioRoutes.put(
  '/:id',
  modificationRateLimit,
  ...comentarioOperations.update,
  ComentarioDependencies.controller.update
)

/**
 * DELETE /comentarios/:id - Remove comentário existente
 * Requer autenticação e autorização (próprio usuário)
 */
ComentarioRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...comentarioOperations.delete,
  ComentarioDependencies.controller.delete
)

export { ComentarioRoutes }
