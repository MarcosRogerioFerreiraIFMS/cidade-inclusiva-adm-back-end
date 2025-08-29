import { Router } from 'express'

import { ProfissionalDependencies } from '../dependencies/ProfissionalDependencies'
import {
  authMiddleware,
  optionalAuthMiddleware
} from '../middlewares/authMiddleware'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const ProfissionalRoutes = Router()

ProfissionalRoutes.post(
  '/',
  authMiddleware,
  validateRequiredBody(['nome', 'email', 'especialidade', 'telefone']),
  ProfissionalDependencies.controller.create
)

ProfissionalRoutes.get(
  '/',
  optionalAuthMiddleware,
  ProfissionalDependencies.controller.findAll
)

ProfissionalRoutes.get(
  '/:id',
  optionalAuthMiddleware,
  validateUUID('id'),
  ProfissionalDependencies.controller.findById
)

ProfissionalRoutes.put(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  validateRequiredBody([]),
  ProfissionalDependencies.controller.update
)

ProfissionalRoutes.delete(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  ProfissionalDependencies.controller.delete
)

export { ProfissionalRoutes }
