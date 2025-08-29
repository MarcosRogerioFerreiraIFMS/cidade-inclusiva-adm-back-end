import { Router } from 'express'
import { UsuarioDependencies } from '../dependencies/UsuarioDependencies'
import { authMiddleware } from '../middlewares/authMiddleware'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const UsuarioRoutes = Router()

UsuarioRoutes.post(
  '/',
  validateRequiredBody(['nome', 'telefone', 'email', 'senha', 'endereco']),
  UsuarioDependencies.controller.create
)

UsuarioRoutes.get('/', authMiddleware, UsuarioDependencies.controller.findAll)

UsuarioRoutes.get(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  UsuarioDependencies.controller.findById
)

UsuarioRoutes.get(
  '/email/:email',
  authMiddleware,
  UsuarioDependencies.controller.findByEmail
)

UsuarioRoutes.put(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  validateRequiredBody([]),
  UsuarioDependencies.controller.update
)

UsuarioRoutes.delete(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  UsuarioDependencies.controller.delete
)

export { UsuarioRoutes }
