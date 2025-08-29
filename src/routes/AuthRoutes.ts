import { Router } from 'express'
import { AuthDependencies } from '../dependencies/AuthDependencies'
import { validateRequiredBody } from '../middlewares/validationMiddleware'

const AuthRoutes = Router()

AuthRoutes.post(
  '/login',
  validateRequiredBody(['email', 'senha']),
  AuthDependencies.controller.login
)

AuthRoutes.get('/validate-token', AuthDependencies.controller.validateToken)

export { AuthRoutes }
