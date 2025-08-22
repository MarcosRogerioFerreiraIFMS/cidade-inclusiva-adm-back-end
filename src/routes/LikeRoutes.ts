import { Router } from 'express'
import { LikeDependencies } from '../dependencies/LikeDependencies'
import { validateUUID } from '../middlewares/validationMiddleware'

const LikeRoutes = Router()

LikeRoutes.patch(
  '/toggle/:usuarioId/:comentarioId',
  validateUUID('usuarioId'),
  validateUUID('comentarioId'),
  LikeDependencies.controller.toggle
)

LikeRoutes.get('/:id', validateUUID('id'), LikeDependencies.controller.findById)

LikeRoutes.delete(
  '/:id',
  validateUUID('id'),
  LikeDependencies.controller.delete
)

LikeRoutes.get(
  '/comentario/:comentarioId',
  validateUUID('comentarioId'),
  LikeDependencies.controller.findByComentario
)

LikeRoutes.get(
  '/usuario/:usuarioId',
  validateUUID('usuarioId'),
  LikeDependencies.controller.findByUsuario
)

export { LikeRoutes }
