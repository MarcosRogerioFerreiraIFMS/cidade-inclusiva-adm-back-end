import { Router } from 'express'
import { NoticiaDependencies } from '../dependencies/NoticiaDependencies'
import { noticiaOperations } from '../middlewares/compositeAuthMiddleware'

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
  ...noticiaOperations.create,
  NoticiaDependencies.controller.create
)

/**
 * GET /noticias - Lista todas as notícias
 * Público, sem necessidade de autenticação
 */
NoticiaRoutes.get(
  '/',
  ...noticiaOperations.list,
  NoticiaDependencies.controller.findAll
)

/**
 * GET /noticias/:id - Busca notícia por ID
 * Público, sem necessidade de autenticação
 */
NoticiaRoutes.get(
  '/:id',
  ...noticiaOperations.view,
  NoticiaDependencies.controller.findById
)

/**
 * PUT /noticias/:id - Atualiza notícia existente
 * Requer autenticação e autorização para atualização
 */
NoticiaRoutes.put(
  '/:id',
  ...noticiaOperations.update,
  NoticiaDependencies.controller.update
)

/**
 * DELETE /noticias/:id - Remove notícia existente
 * Requer autenticação e autorização para remoção
 */
NoticiaRoutes.delete(
  '/:id',
  ...noticiaOperations.delete,
  NoticiaDependencies.controller.delete
)

export { NoticiaRoutes }
