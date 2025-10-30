import { ComentarioDependencies } from '@/dependencies/ComentarioDependencies'
import { ProfissionalDependencies } from '@/dependencies/ProfissionalDependencies'
import {
  authenticated,
  contentCreationRateLimit,
  modificationRateLimit,
  profissionalOperations,
  readOperationsRateLimit
} from '@/middlewares'
import { validateUUID } from '@/middlewares/validationMiddleware'
import { Router } from 'express'

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
  contentCreationRateLimit,
  ...profissionalOperations.create,
  ProfissionalDependencies.controller.create
)

/**
 * GET /profissionais - Lista todos os profissionais
 * Público, sem necessidade de autenticação
 */
ProfissionalRoutes.get(
  '/',
  readOperationsRateLimit,
  ...profissionalOperations.list,
  ProfissionalDependencies.controller.findAll
)

/**
 * GET /profissionais/:id - Busca profissional por ID
 * Público, sem necessidade de autenticação
 */
ProfissionalRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...profissionalOperations.view,
  ProfissionalDependencies.controller.findById
)

/**
 * PUT /profissionais/:id - Atualiza profissional existente
 * Requer autenticação e autorização para atualização
 */
ProfissionalRoutes.put(
  '/:id',
  modificationRateLimit,
  ...profissionalOperations.update,
  ProfissionalDependencies.controller.update
)

/**
 * DELETE /profissionais/:id - Remove profissional existente
 * Requer autenticação e autorização para remoção
 */
ProfissionalRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...profissionalOperations.delete,
  ProfissionalDependencies.controller.delete
)

/**
 * GET /profissionais/:id/comentarios - Lista todos os comentários de um profissional
 * Requer autenticação - admins veem todos, usuários veem apenas visíveis
 */
ProfissionalRoutes.get(
  '/:id/comentarios',
  readOperationsRateLimit,
  ...authenticated,
  validateUUID('id'),
  ComentarioDependencies.controller.findByProfissional
)

export { ProfissionalRoutes }
