import { NoticiaDependencies } from '@/dependencies/NoticiaDependencies'
import {
  contentCreationRateLimit,
  modificationRateLimit,
  noticiaOperations,
  readOperationsRateLimit
} from '@/middlewares'
import { Router } from 'express'

/**
 * - Router para rotas de notícias
 * - Define todos os endpoints CRUD para gerenciamento de notícias
 * - Inclui middleware de autenticação e autorização apropriados
 */
const NoticiaRoutes = Router()

/**
 * POST /noticias - Cria uma nova notícia
 * Requer autenticação e autorização para criação
 */
NoticiaRoutes.post(
  '/',
  contentCreationRateLimit,
  ...noticiaOperations.create,
  NoticiaDependencies.controller.create
)

/**
 * GET /noticias - Lista todas as notícias
 * Requer autenticação (usuários normais têm acesso apenas leitura)
 */
NoticiaRoutes.get(
  '/',
  readOperationsRateLimit,
  ...noticiaOperations.list,
  NoticiaDependencies.controller.findAll
)

/**
 * GET /noticias/:id - Busca notícia por ID
 * Requer autenticação (usuários normais têm acesso apenas leitura)
 */
NoticiaRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...noticiaOperations.view,
  NoticiaDependencies.controller.findById
)

/**
 * PUT /noticias/:id - Atualiza notícia existente
 * Requer autenticação e autorização para atualização
 */
NoticiaRoutes.put(
  '/:id',
  modificationRateLimit,
  ...noticiaOperations.update,
  NoticiaDependencies.controller.update
)

/**
 * DELETE /noticias/:id - Remove notícia existente
 * Requer autenticação e autorização para remoção
 */
NoticiaRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...noticiaOperations.delete,
  NoticiaDependencies.controller.delete
)

export { NoticiaRoutes }
