import { VeiculoDependencies } from '@/dependencies/VeiculoDependencies'
import {
  contentCreationRateLimit,
  modificationRateLimit,
  readOperationsRateLimit,
  validateRequiredBody,
  validateUUID,
  veiculoOperations
} from '@/middlewares'
import { Router } from 'express'

/**
 * - Router para rotas de veículos
 * - Define todos os endpoints CRUD para gerenciamento de veículos
 * - Inclui middleware de autenticação e autorização apropriados
 */
const VeiculoRoutes = Router()

/**
 * POST /veiculos - Cria um novo veículo
 * Requer autenticação e autorização de administrador
 */
VeiculoRoutes.post(
  '/',
  contentCreationRateLimit,
  ...veiculoOperations.create,
  validateRequiredBody(['placa', 'marca', 'modelo', 'cor', 'motoristaId']),
  VeiculoDependencies.controller.create
)

/**
 * GET /veiculos - Lista todos os veículos
 * Requer autenticação
 */
VeiculoRoutes.get(
  '/',
  readOperationsRateLimit,
  ...veiculoOperations.list,
  VeiculoDependencies.controller.findAll
)

/**
 * GET /veiculos/:id - Busca veículo por ID
 * Requer autenticação
 */
VeiculoRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...veiculoOperations.view,
  validateUUID('id'),
  VeiculoDependencies.controller.findById
)

/**
 * PUT /veiculos/:id - Atualiza veículo existente
 * Requer autenticação e autorização de administrador
 */
VeiculoRoutes.put(
  '/:id',
  modificationRateLimit,
  ...veiculoOperations.update,
  validateUUID('id'),
  validateRequiredBody([]),
  VeiculoDependencies.controller.update
)

/**
 * DELETE /veiculos/:id - Remove veículo existente
 * Requer autenticação e autorização de administrador
 */
VeiculoRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...veiculoOperations.delete,
  validateUUID('id'),
  VeiculoDependencies.controller.delete
)

export { VeiculoRoutes }
