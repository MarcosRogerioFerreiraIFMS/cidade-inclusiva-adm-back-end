import { AcessibilidadeUrbanaDependencies } from '@/dependencies/AcessibilidadeUrbanaDependencies'
import { ComentarioDependencies } from '@/dependencies/ComentarioDependencies'
import {
  acessibilidadeUrbanaOperations,
  authenticated,
  contentCreationRateLimit,
  modificationRateLimit,
  readOperationsRateLimit
} from '@/middlewares'
import { validateUUID } from '@/middlewares/validationMiddleware'
import { Router } from 'express'

/**
 * - Router para rotas de acessibilidade urbana
 * - Define todos os endpoints CRUD para gerenciamento de acessibilidade urbana
 * - Inclui middleware de autenticação e autorização apropriados
 */
const AcessibilidadeUrbanaRoutes = Router()

/**
 * POST /acessibilidade-urbana - Cria nova acessibilidade urbana
 * Requer autenticação para criação
 */
AcessibilidadeUrbanaRoutes.post(
  '/',
  contentCreationRateLimit,
  ...acessibilidadeUrbanaOperations.create,
  AcessibilidadeUrbanaDependencies.controller.create
)

/**
 * GET /acessibilidade-urbana - Lista todas as acessibilidades urbanas
 * Público, sem necessidade de autenticação
 */
AcessibilidadeUrbanaRoutes.get(
  '/',
  readOperationsRateLimit,
  ...acessibilidadeUrbanaOperations.list,
  AcessibilidadeUrbanaDependencies.controller.findAll
)

/**
 * GET /acessibilidade-urbana/:id - Busca acessibilidade urbana por ID
 * Público, sem necessidade de autenticação
 */
AcessibilidadeUrbanaRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...acessibilidadeUrbanaOperations.view,
  AcessibilidadeUrbanaDependencies.controller.findById
)

/**
 * PUT /acessibilidade-urbana/:id - Atualiza acessibilidade urbana existente
 * Requer autenticação e autorização para atualização
 */
AcessibilidadeUrbanaRoutes.put(
  '/:id',
  modificationRateLimit,
  ...acessibilidadeUrbanaOperations.update,
  AcessibilidadeUrbanaDependencies.controller.update
)

/**
 * DELETE /acessibilidade-urbana/:id - Remove acessibilidade urbana existente
 * Requer autenticação e autorização para remoção
 */
AcessibilidadeUrbanaRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...acessibilidadeUrbanaOperations.delete,
  AcessibilidadeUrbanaDependencies.controller.delete
)

/**
 * GET /acessibilidade-urbana/categoria/:categoria - Busca por categoria
 * Público, sem necessidade de autenticação
 */
AcessibilidadeUrbanaRoutes.get(
  '/categoria/:categoria',
  readOperationsRateLimit,
  ...acessibilidadeUrbanaOperations.findByCategoria,
  AcessibilidadeUrbanaDependencies.controller.findByCategoria
)

/**
 * GET /acessibilidade-urbana/email/:email - Busca por email (admin apenas)
 * Requer autenticação de administrador
 */
AcessibilidadeUrbanaRoutes.get(
  '/email/:email',
  readOperationsRateLimit,
  ...acessibilidadeUrbanaOperations.findByEmail,
  AcessibilidadeUrbanaDependencies.controller.findByEmail
)

/**
 * GET /acessibilidade-urbana/:id/comentarios - Lista todos os comentários de uma acessibilidade urbana
 * Requer autenticação - admins veem todos, usuários veem apenas visíveis
 */
AcessibilidadeUrbanaRoutes.get(
  '/:id/comentarios',
  readOperationsRateLimit,
  ...authenticated,
  validateUUID('id'),
  ComentarioDependencies.controller.findByAcessibilidadeUrbana
)

export { AcessibilidadeUrbanaRoutes }
