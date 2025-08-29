import { Router } from 'express'
import { LikeDependencies } from '../dependencies/LikeDependencies'
import {
  authMiddleware,
  optionalAuthMiddleware
} from '../middlewares/authMiddleware'
import { validateUUID } from '../middlewares/validationMiddleware'

const LikeRoutes = Router()

LikeRoutes.patch(
  '/toggle/:usuarioId/:comentarioId',
  authMiddleware,
  validateUUID('usuarioId'),
  validateUUID('comentarioId'),
  LikeDependencies.controller.toggle
)

LikeRoutes.get(
  '/:id',
  optionalAuthMiddleware,
  validateUUID('id'),
  LikeDependencies.controller.findById
)

LikeRoutes.delete(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  LikeDependencies.controller.delete
)

LikeRoutes.get(
  '/comentario/:comentarioId',
  optionalAuthMiddleware,
  validateUUID('comentarioId'),
  LikeDependencies.controller.findByComentario
)

LikeRoutes.get(
  '/usuario/:usuarioId',
  authMiddleware,
  validateUUID('usuarioId'),
  LikeDependencies.controller.findByUsuario
)

export { LikeRoutes }
