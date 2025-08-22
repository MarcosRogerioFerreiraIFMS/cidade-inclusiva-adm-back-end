import { Router } from 'express'
import { NoticiaDependencies } from '../dependencies/NoticiaDependencies'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const NoticiaRoutes = Router()

NoticiaRoutes.post(
  '/',
  validateRequiredBody(['titulo', 'conteudo', 'categoria']),
  NoticiaDependencies.controller.create
)

NoticiaRoutes.get('/', NoticiaDependencies.controller.findAll)

NoticiaRoutes.get(
  '/:id',
  validateUUID('id'),
  NoticiaDependencies.controller.findById
)

NoticiaRoutes.put(
  '/:id',
  validateUUID('id'),
  validateRequiredBody([]),
  NoticiaDependencies.controller.update
)

NoticiaRoutes.delete(
  '/:id',
  validateUUID('id'),
  NoticiaDependencies.controller.delete
)

export { NoticiaRoutes }
