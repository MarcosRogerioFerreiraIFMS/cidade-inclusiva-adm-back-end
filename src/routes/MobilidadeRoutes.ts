import { MobilidadeDependencies } from '@/dependencies/MobilidadeDependencies'
import {
  contentCreationRateLimit,
  mobilidadeOperations,
  modificationRateLimit,
  readOperationsRateLimit
} from '@/middlewares'
import { Router } from 'express'

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
 * Requer autenticação para visualizar
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
 * Requer autenticação para visualizar
 */
MobilidadeRoutes.get(
  '/status/:status',
  readOperationsRateLimit,
  ...mobilidadeOperations.findByStatus,
  MobilidadeDependencies.controller.findByStatus
)

/**
 * GET /mobilidades/:id - Busca mobilidade por ID
 * Requer autenticação para visualizar
 */
MobilidadeRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...mobilidadeOperations.view,
  MobilidadeDependencies.controller.findById
)

/**
 * PUT /mobilidades/:id - Atualiza mobilidade existente
 * Requer autenticação e verifica se é o proprietário (usuário normal apenas)
 */
MobilidadeRoutes.put(
  '/:id',
  modificationRateLimit,
  ...mobilidadeOperations.update,
  MobilidadeDependencies.controller.update
)

/**
 * DELETE /mobilidades/:id - Remove mobilidade existente
 * Requer autenticação e verifica se é o proprietário (usuário normal apenas)
 */
MobilidadeRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...mobilidadeOperations.delete,
  MobilidadeDependencies.controller.delete
)

export { MobilidadeRoutes }
