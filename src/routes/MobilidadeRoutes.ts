import { Router } from 'express'
import { MobilidadeDependencies } from '../dependencies/MobilidadeDependencies'
import { mobilidadeOperations } from '../middlewares/compositeAuthMiddleware'
import {
  contentCreationRateLimit,
  modificationRateLimit,
  readOperationsRateLimit
} from '../middlewares/rateLimitMiddleware'

/**
 * - Router para rotas de mobilidade
 * - Define todos os endpoints CRUD para gerenciamento de mobilidades
 * - Inclui middleware de autenticação e autorização apropriados
 */
const MobilidadeRoutes = Router()

/**
 * POST /mobilidades - Cria uma nova mobilidade
 * Requer autenticação para criação
 */
MobilidadeRoutes.post(
  '/',
  contentCreationRateLimit,
  ...mobilidadeOperations.create,
  MobilidadeDependencies.controller.create
)

/**
 * GET /mobilidades - Lista todas as mobilidades
 * Público, sem necessidade de autenticação
 */
MobilidadeRoutes.get(
  '/',
  readOperationsRateLimit,
  ...mobilidadeOperations.list,
  MobilidadeDependencies.controller.findAll
)

/**
 * GET /mobilidades/usuario/:usuarioId - Busca mobilidades por usuário
 * Requer autenticação e verifica se é o próprio usuário ou admin
 */
MobilidadeRoutes.get(
  '/usuario/:usuarioId',
  readOperationsRateLimit,
  ...mobilidadeOperations.findByUser,
  MobilidadeDependencies.controller.findByUsuario
)

/**
 * GET /mobilidades/status/:status - Busca mobilidades por status
 * Público, sem necessidade de autenticação
 */
MobilidadeRoutes.get(
  '/status/:status',
  readOperationsRateLimit,
  ...mobilidadeOperations.findByStatus,
  MobilidadeDependencies.controller.findByStatus
)

/**
 * GET /mobilidades/:id - Busca mobilidade por ID
 * Público, sem necessidade de autenticação
 */
MobilidadeRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...mobilidadeOperations.view,
  MobilidadeDependencies.controller.findById
)

/**
 * PUT /mobilidades/:id - Atualiza mobilidade existente
 * Requer autenticação e verifica se é o proprietário ou admin
 */
MobilidadeRoutes.put(
  '/:id',
  modificationRateLimit,
  ...mobilidadeOperations.update,
  MobilidadeDependencies.controller.update
)

/**
 * DELETE /mobilidades/:id - Remove mobilidade existente
 * Requer autenticação e verifica se é o proprietário ou admin
 */
MobilidadeRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...mobilidadeOperations.delete,
  MobilidadeDependencies.controller.delete
)

export { MobilidadeRoutes }
