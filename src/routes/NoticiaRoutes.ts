import { Router } from 'express'
import { NoticiaDependencies } from '../dependencies/NoticiaDependencies'
import { noticiaOperations } from '../middlewares/compositeAuthMiddleware'

const NoticiaRoutes = Router()

NoticiaRoutes.post(
  '/',
  ...noticiaOperations.create,
  NoticiaDependencies.controller.create
)

NoticiaRoutes.get(
  '/',
  ...noticiaOperations.list,
  NoticiaDependencies.controller.findAll
)

NoticiaRoutes.get(
  '/:id',
  ...noticiaOperations.view,
  NoticiaDependencies.controller.findById
)

NoticiaRoutes.put(
  '/:id',
  ...noticiaOperations.update,
  NoticiaDependencies.controller.update
)

NoticiaRoutes.delete(
  '/:id',
  ...noticiaOperations.delete,
  NoticiaDependencies.controller.delete
)

export { NoticiaRoutes }
