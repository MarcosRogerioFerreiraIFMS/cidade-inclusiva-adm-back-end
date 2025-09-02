import { Router } from 'express'
import { ProfissionalDependencies } from '../dependencies/ProfissionalDependencies'
import { profissionalOperations } from '../middlewares/compositeAuthMiddleware'

/**
 * - Router para rotas de profissionais
 * - Define todos os endpoints CRUD para gerenciamento de profissionais
 * - Inclui middleware de autenticação e autorização apropriados
 */
const ProfissionalRoutes = Router()

/**
 * POST /profissionais - Cria um novo profissional
 * Requer autenticação e autorização para criação
 */
ProfissionalRoutes.post(
  '/',
  ...profissionalOperations.create,
  ProfissionalDependencies.controller.create
)

/**
 * GET /profissionais - Lista todos os profissionais
 * Público, sem necessidade de autenticação
 */
ProfissionalRoutes.get(
  '/',
  ...profissionalOperations.list,
  ProfissionalDependencies.controller.findAll
)

/**
 * GET /profissionais/:id - Busca profissional por ID
 * Público, sem necessidade de autenticação
 */
ProfissionalRoutes.get(
  '/:id',
  ...profissionalOperations.view,
  ProfissionalDependencies.controller.findById
)

/**
 * PUT /profissionais/:id - Atualiza profissional existente
 * Requer autenticação e autorização para atualização
 */
ProfissionalRoutes.put(
  '/:id',
  ...profissionalOperations.update,
  ProfissionalDependencies.controller.update
)

/**
 * DELETE /profissionais/:id - Remove profissional existente
 * Requer autenticação e autorização para remoção
 */
ProfissionalRoutes.delete(
  '/:id',
  ...profissionalOperations.delete,
  ProfissionalDependencies.controller.delete
)

export { ProfissionalRoutes }
