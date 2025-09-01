import { Router } from 'express'
import { ProfissionalDependencies } from '../dependencies/ProfissionalDependencies'
import { profissionalOperations } from '../middlewares/compositeAuthMiddleware'

const ProfissionalRoutes = Router()

ProfissionalRoutes.post(
  '/',
  ...profissionalOperations.create,
  ProfissionalDependencies.controller.create
)

ProfissionalRoutes.get(
  '/',
  ...profissionalOperations.list,
  ProfissionalDependencies.controller.findAll
)

ProfissionalRoutes.get(
  '/:id',
  ...profissionalOperations.view,
  ProfissionalDependencies.controller.findById
)

ProfissionalRoutes.put(
  '/:id',
  ...profissionalOperations.update,
  ProfissionalDependencies.controller.update
)

ProfissionalRoutes.delete(
  '/:id',
  ...profissionalOperations.delete,
  ProfissionalDependencies.controller.delete
)

export { ProfissionalRoutes }
