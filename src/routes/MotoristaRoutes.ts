import { ComentarioDependencies } from '@/dependencies/ComentarioDependencies'
import { MotoristaDependencies } from '@/dependencies/MotoristaDependencies'
import {
  authenticated,
  contentCreationRateLimit,
  modificationRateLimit,
  motoristaOperations,
  readOperationsRateLimit,
  validateRequiredBody,
  validateUUID
} from '@/middlewares'
import { Router } from 'express'

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

/**
 * GET /motoristas/:id/comentarios - Lista todos os comentários de um motorista
 * Requer autenticação - admins veem todos, usuários veem apenas visíveis
 */
MotoristaRoutes.get(
  '/:id/comentarios',
  readOperationsRateLimit,
  ...authenticated,
  validateUUID('id'),
  ComentarioDependencies.controller.findByMotorista
)

export { MotoristaRoutes }
