import { Router } from 'express'

import { ProfissionalDependencies } from '../dependencies/ProfissionalDependencies'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const ProfissionalRoutes = Router()

ProfissionalRoutes.post(
  '/',
  validateRequiredBody(['nome', 'email', 'especialidade', 'telefone']),
  ProfissionalDependencies.controller.create
)

ProfissionalRoutes.get('/', ProfissionalDependencies.controller.findAll)

ProfissionalRoutes.get(
  '/:id',
  validateUUID('id'),
  ProfissionalDependencies.controller.findById
)

ProfissionalRoutes.put(
  '/:id',
  validateUUID('id'),
  validateRequiredBody([]),
  ProfissionalDependencies.controller.update
)

ProfissionalRoutes.delete(
  '/:id',
  validateUUID('id'),
  ProfissionalDependencies.controller.delete
)

export { ProfissionalRoutes }
