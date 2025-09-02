import { Router } from 'express'
import { ComentarioDependencies } from '../dependencies/ComentarioDependencies'
import { comentarioOperations } from '../middlewares/compositeAuthMiddleware'

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
  ...comentarioOperations.create,
  ComentarioDependencies.controller.create
)

/**
 * GET /comentarios - Lista todos os comentários
 * Requer autenticação para listagem
 */
ComentarioRoutes.get(
  '/',
  ...comentarioOperations.list,
  ComentarioDependencies.controller.findAll
)

/**
 * GET /comentarios/:id - Busca comentário por ID
 * Requer autenticação para visualização
 */
ComentarioRoutes.get(
  '/:id',
  ...comentarioOperations.view,
  ComentarioDependencies.controller.findById
)

/**
 * PUT /comentarios/:id - Atualiza comentário existente
 * Requer autenticação e autorização (próprio usuário)
 */
ComentarioRoutes.put(
  '/:id',
  ...comentarioOperations.update,
  ComentarioDependencies.controller.update
)

/**
 * DELETE /comentarios/:id - Remove comentário existente
 * Requer autenticação e autorização (próprio usuário)
 */
ComentarioRoutes.delete(
  '/:id',
  ...comentarioOperations.delete,
  ComentarioDependencies.controller.delete
)

/**
 * GET /comentarios/profissional/:profissionalId - Lista comentários de um profissional
 * Rota pública com autenticação opcional
 */
ComentarioRoutes.get(
  '/profissional/:profissionalId',
  ...comentarioOperations.findByProfessional,
  ComentarioDependencies.controller.findByProfissional
)

/**
 * GET /comentarios/profissional/:profissionalId/visiveis - Lista comentários visíveis de um profissional
 * Rota pública, sem necessidade de autenticação
 */
ComentarioRoutes.get(
  '/profissional/:profissionalId/visiveis',
  ...comentarioOperations.findVisibleByProfessional,
  ComentarioDependencies.controller.findVisibleByProfissional
)

export { ComentarioRoutes }
