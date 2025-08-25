import { Router } from 'express'

import { ComentarioDependencies } from '../dependencies/ComentarioDependencies'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const ComentarioRoutes = Router()

ComentarioRoutes.post(
  '/',
  validateRequiredBody(['conteudo', 'usuarioId']),
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
  validateRequiredBody([]),
  ComentarioDependencies.controller.update
)

ComentarioRoutes.delete(
  '/:id',
  validateUUID('id'),
  ComentarioDependencies.controller.delete
)

ComentarioRoutes.get(
  '/profissional/:profissionalId',
  validateUUID('profissionalId'),
  ComentarioDependencies.controller.findByProfissional
)

ComentarioRoutes.get(
  '/profissional/:profissionalId/visiveis',
  validateUUID('profissionalId'),
  ComentarioDependencies.controller.findVisibleByProfissional
)

export { ComentarioRoutes }
