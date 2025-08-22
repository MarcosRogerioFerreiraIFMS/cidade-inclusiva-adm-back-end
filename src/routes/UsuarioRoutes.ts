import { Router } from 'express'
import { UsuarioDependencies } from '../dependencies/UsuarioDependencies'
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

UsuarioRoutes.get('/', UsuarioDependencies.controller.findAll)

UsuarioRoutes.get(
  '/:id',
  validateUUID('id'),
  UsuarioDependencies.controller.findById
)

UsuarioRoutes.get('/email/:email', UsuarioDependencies.controller.findByEmail)

UsuarioRoutes.put(
  '/:id',
  validateUUID('id'),
  validateRequiredBody([]),
  UsuarioDependencies.controller.update
)

UsuarioRoutes.delete(
  '/:id',
  validateUUID('id'),
  UsuarioDependencies.controller.delete
)

export { UsuarioRoutes }
