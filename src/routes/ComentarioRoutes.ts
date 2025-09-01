import { Router } from 'express'
import { ComentarioDependencies } from '../dependencies/ComentarioDependencies'
import { comentarioOperations } from '../middlewares/compositeAuthMiddleware'

const ComentarioRoutes = Router()

ComentarioRoutes.post(
  '/',
  ...comentarioOperations.create,
  ComentarioDependencies.controller.create
)

ComentarioRoutes.get(
  '/',
  ...comentarioOperations.list,
  ComentarioDependencies.controller.findAll
)

ComentarioRoutes.get(
  '/:id',
  ...comentarioOperations.view,
  ComentarioDependencies.controller.findById
)

ComentarioRoutes.put(
  '/:id',
  ...comentarioOperations.update,
  ComentarioDependencies.controller.update
)

ComentarioRoutes.delete(
  '/:id',
  ...comentarioOperations.delete,
  ComentarioDependencies.controller.delete
)

// Rotas públicas para visualização de comentários (autenticação opcional)
ComentarioRoutes.get(
  '/profissional/:profissionalId',
  ...comentarioOperations.findByProfessional,
  ComentarioDependencies.controller.findByProfissional
)

ComentarioRoutes.get(
  '/profissional/:profissionalId/visiveis',
  ...comentarioOperations.findVisibleByProfessional,
  ComentarioDependencies.controller.findVisibleByProfissional
)

export { ComentarioRoutes }
