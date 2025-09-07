import { Router } from 'express'
import { MotoristaDependencies } from '../dependencies/MotoristaDependencies'
import { motoristaOperations } from '../middlewares/compositeAuthMiddleware'
import {
  contentCreationRateLimit,
  modificationRateLimit,
  readOperationsRateLimit
} from '../middlewares/rateLimitMiddleware'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

/**
 * - Router para rotas de motoristas
 * - Define todos os endpoints CRUD para gerenciamento de motoristas
 * - Inclui middleware de autenticação e autorização apropriados
 */
const MotoristaRoutes = Router()

/**
 * POST /motoristas - Cria um novo motorista
 * Requer autenticação e autorização de administrador
 */
MotoristaRoutes.post(
  '/',
  contentCreationRateLimit,
  ...motoristaOperations.create,
  validateRequiredBody(['nome', 'telefone', 'email']),
  MotoristaDependencies.controller.create
)

/**
 * GET /motoristas - Lista todos os motoristas
 * Requer autenticação
 */
MotoristaRoutes.get(
  '/',
  readOperationsRateLimit,
  ...motoristaOperations.list,
  MotoristaDependencies.controller.findAll
)

/**
 * GET /motoristas/:id - Busca motorista por ID
 * Requer autenticação
 */
MotoristaRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...motoristaOperations.view,
  validateUUID('id'),
  MotoristaDependencies.controller.findById
)

/**
 * PUT /motoristas/:id - Atualiza motorista existente
 * Requer autenticação e autorização de administrador
 */
MotoristaRoutes.put(
  '/:id',
  modificationRateLimit,
  ...motoristaOperations.update,
  validateUUID('id'),
  validateRequiredBody([]),
  MotoristaDependencies.controller.update
)

/**
 * DELETE /motoristas/:id - Remove motorista existente
 * Requer autenticação e autorização de administrador
 */
MotoristaRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...motoristaOperations.delete,
  validateUUID('id'),
  MotoristaDependencies.controller.delete
)

export { MotoristaRoutes }
