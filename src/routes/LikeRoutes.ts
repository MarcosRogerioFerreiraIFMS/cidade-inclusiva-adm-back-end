import { Router } from 'express'
import { LikeDependencies } from '../dependencies/LikeDependencies'
import { likeOperations } from '../middlewares/compositeAuthMiddleware'

const LikeRoutes = Router()

LikeRoutes.patch(
  '/toggle/:usuarioId/:comentarioId',
  ...likeOperations.toggle,
  LikeDependencies.controller.toggle
)

LikeRoutes.get(
  '/:id',
  ...likeOperations.view,
  LikeDependencies.controller.findById
)

LikeRoutes.delete(
  '/:id',
  ...likeOperations.delete,
  LikeDependencies.controller.delete
)

LikeRoutes.get(
  '/comentario/:comentarioId',
  ...likeOperations.findByComment,
  LikeDependencies.controller.findByComentario
)

LikeRoutes.get(
  '/usuario/:usuarioId',
  ...likeOperations.findByUser,
  LikeDependencies.controller.findByUsuario
)

export { LikeRoutes }
