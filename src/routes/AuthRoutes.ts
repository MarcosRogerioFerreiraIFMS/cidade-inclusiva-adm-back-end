import { Router } from 'express'
import { AuthDependencies } from '../dependencies/AuthDependencies'
import { authOperations } from '../middlewares/compositeAuthMiddleware'

/**
 * - Rotas para operações de autenticação
 * - Define endpoints para login e validação de token
 */
const AuthRoutes = Router()

/**
 * POST /auth/login
 * Endpoint para autenticação de usuários
 */
AuthRoutes.post(
  '/login',
  ...authOperations.login,
  AuthDependencies.controller.login
)

/**
 * GET /auth/validate-token
 * Endpoint para validação de token JWT
 */
AuthRoutes.get(
  '/validate-token',
  ...authOperations.validateToken,
  AuthDependencies.controller.validateToken
)

export { AuthRoutes }
