import { Router } from 'express'
import { AuthDependencies } from '../dependencies/AuthDependencies'
import { authOperations } from '../middlewares/compositeAuthMiddleware'

const AuthRoutes = Router()

AuthRoutes.post(
  '/login',
  ...authOperations.login,
  AuthDependencies.controller.login
)

AuthRoutes.get(
  '/validate-token',
  ...authOperations.validateToken,
  AuthDependencies.controller.validateToken
)

export { AuthRoutes }
