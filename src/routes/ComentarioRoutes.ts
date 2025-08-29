import { Router } from 'express'

import { ComentarioDependencies } from '../dependencies/ComentarioDependencies'
import {
  authMiddleware,
  optionalAuthMiddleware
} from '../middlewares/authMiddleware'
import {
  validateRequiredBody,
  validateUUID
} from '../middlewares/validationMiddleware'

const ComentarioRoutes = Router()

ComentarioRoutes.post(
  '/',
  authMiddleware,
  validateRequiredBody(['conteudo', 'usuarioId']),
  ComentarioDependencies.controller.create
)

ComentarioRoutes.get(
  '/',
  optionalAuthMiddleware,
  ComentarioDependencies.controller.findAll
)

ComentarioRoutes.get(
  '/:id',
  optionalAuthMiddleware,
  validateUUID('id'),
  ComentarioDependencies.controller.findById
)

ComentarioRoutes.put(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  validateRequiredBody([]),
  ComentarioDependencies.controller.update
)

ComentarioRoutes.delete(
  '/:id',
  authMiddleware,
  validateUUID('id'),
  ComentarioDependencies.controller.delete
)

// Rotas públicas para visualização de comentários (autenticação opcional)
ComentarioRoutes.get(
  '/profissional/:profissionalId',
  optionalAuthMiddleware,
  validateUUID('profissionalId'),
  ComentarioDependencies.controller.findByProfissional
)

ComentarioRoutes.get(
  '/profissional/:profissionalId/visiveis',
  optionalAuthMiddleware,
  validateUUID('profissionalId'),
  ComentarioDependencies.controller.findVisibleByProfissional
)

export { ComentarioRoutes }
