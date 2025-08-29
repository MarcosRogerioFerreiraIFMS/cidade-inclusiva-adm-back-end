import { Router } from 'express'
import { NoticiaDependencies } from '../dependencies/NoticiaDependencies'
import {
  authMiddleware,
  optionalAuthMiddleware
} from '../middlewares/authMiddleware'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const NoticiaRoutes = Router()

NoticiaRoutes.post(
  '/',
  authMiddleware,
  validateRequiredBody(['titulo', 'conteudo', 'categoria']),
  NoticiaDependencies.controller.create
)

NoticiaRoutes.get(
  '/',
  optionalAuthMiddleware,
  NoticiaDependencies.controller.findAll
)

NoticiaRoutes.get(
  '/:id',
  optionalAuthMiddleware,
  validateUUID('id'),
  NoticiaDependencies.controller.findById
)

NoticiaRoutes.put(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  validateRequiredBody([]),
  NoticiaDependencies.controller.update
)

NoticiaRoutes.delete(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  NoticiaDependencies.controller.delete
)

export { NoticiaRoutes }
