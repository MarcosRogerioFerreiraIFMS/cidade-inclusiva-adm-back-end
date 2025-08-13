import { Router } from 'express'

import { ComentarioDependencies } from '../dependencies/ComentarioDependencies'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const ComentarioRoutes = Router()

ComentarioRoutes.post(
  '/',
  validateRequiredBody(['conteudo', 'entidadeId', 'entidadeTipo']),
  ComentarioDependencies.controller.create
)

ComentarioRoutes.get('/', ComentarioDependencies.controller.findAll)

ComentarioRoutes.get(
  '/:id',
  validateUUID('id'),
  ComentarioDependencies.controller.findById
)

ComentarioRoutes.put(
  '/:id',
  validateUUID('id'),
  ComentarioDependencies.controller.update
)

ComentarioRoutes.delete(
  '/:id',
  validateUUID('id'),
  ComentarioDependencies.controller.delete
)

ComentarioRoutes.get(
  '/entidade/:entidadeId/:entidadeTipo',
  validateUUID('entidadeId'),
  ComentarioDependencies.controller.findByEntidade
)

ComentarioRoutes.get(
  '/entidade/:entidadeId/:entidadeTipo/visiveis',
  validateUUID('entidadeId'),
  ComentarioDependencies.controller.findVisibleByEntidade
)

ComentarioRoutes.patch(
  '/:id/likes',
  validateUUID('id'),
  ComentarioDependencies.controller.incrementLikes
)

export { ComentarioRoutes }
