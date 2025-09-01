import { Router } from 'express'
import { UsuarioDependencies } from '../dependencies/UsuarioDependencies'
import { usuarioOperations } from '../middlewares/compositeAuthMiddleware'

const UsuarioRoutes = Router()

UsuarioRoutes.post(
  '/',
  ...usuarioOperations.register,
  UsuarioDependencies.controller.create
)

UsuarioRoutes.get(
  '/',
  ...usuarioOperations.listAll,
  UsuarioDependencies.controller.findAll
)

UsuarioRoutes.get(
  '/:id',
  ...usuarioOperations.viewProfile,
  UsuarioDependencies.controller.findById
)

UsuarioRoutes.get(
  '/email/:email',
  ...usuarioOperations.findByEmail,
  UsuarioDependencies.controller.findByEmail
)

UsuarioRoutes.put(
  '/:id',
  ...usuarioOperations.updateProfile,
  UsuarioDependencies.controller.update
)

UsuarioRoutes.delete(
  '/:id',
  ...usuarioOperations.deleteProfile,
  UsuarioDependencies.controller.delete
)

export { UsuarioRoutes }
