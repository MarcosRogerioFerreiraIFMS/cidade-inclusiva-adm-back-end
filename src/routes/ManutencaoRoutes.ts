import { ComentarioDependencies } from '@/dependencies/ComentarioDependencies'
import { ManutencaoDependencies } from '@/dependencies/ManutencaoDependencies'
import {
  authenticated,
  emailSearchRateLimit,
  manutencaoOperations,
  modificationRateLimit,
  readOperationsRateLimit
} from '@/middlewares'
import { validateUUID } from '@/middlewares/validationMiddleware'
import { Router } from 'express'

/**
 * - Rotas para operações de manutenções
 * - Define endpoints CRUD para gerenciamento de empresas de manutenção do sistema
 */
const ManutencaoRoutes = Router()

/**
 * POST /manutencoes
 * Endpoint para criação de novas empresas de manutenção (requer admin)
 */
ManutencaoRoutes.post(
  '/',
  modificationRateLimit,
  ...manutencaoOperations.create,
  ManutencaoDependencies.controller.create
)

/**
 * GET /manutencoes
 * Endpoint para listagem de todas as empresas de manutenção (público)
 */
ManutencaoRoutes.get(
  '/',
  readOperationsRateLimit,
  ...manutencaoOperations.list,
  ManutencaoDependencies.controller.findAll
)

/**
 * GET /manutencoes/:id
 * Endpoint para buscar empresa de manutenção específica por ID (público)
 */
ManutencaoRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...manutencaoOperations.view,
  ManutencaoDependencies.controller.findById
)

/**
 * GET /manutencoes/email/:email
 * Endpoint para buscar empresa de manutenção por email (requer admin)
 */
ManutencaoRoutes.get(
  '/email/:email',
  emailSearchRateLimit,
  ...manutencaoOperations.findByEmail,
  ManutencaoDependencies.controller.findByEmail
)

/**
 * GET /manutencoes/especialidade/:especialidade
 * Endpoint para buscar empresas de manutenção por especialidade (público)
 */
ManutencaoRoutes.get(
  '/especialidade/:especialidade',
  readOperationsRateLimit,
  ...manutencaoOperations.findByEspecialidade,
  ManutencaoDependencies.controller.findByEspecialidade
)

/**
 * PUT /manutencoes/:id
 * Endpoint para atualização de dados da empresa de manutenção (requer admin)
 */
ManutencaoRoutes.put(
  '/:id',
  modificationRateLimit,
  ...manutencaoOperations.update,
  ManutencaoDependencies.controller.update
)

/**
 * DELETE /manutencoes/:id
 * Endpoint para remoção de empresa de manutenção (requer admin)
 */
ManutencaoRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...manutencaoOperations.delete,
  ManutencaoDependencies.controller.delete
)

/**
 * GET /manutencoes/:id/comentarios - Lista todos os comentários de uma manutenção
 * Requer autenticação - admins veem todos, usuários veem apenas visíveis
 */
ManutencaoRoutes.get(
  '/:id/comentarios',
  readOperationsRateLimit,
  ...authenticated,
  validateUUID('id'),
  ComentarioDependencies.controller.findByManutencao
)

export { ManutencaoRoutes }
