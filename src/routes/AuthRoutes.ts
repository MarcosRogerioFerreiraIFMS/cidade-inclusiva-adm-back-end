import { AuthDependencies } from '@/dependencies/AuthDependencies'
import {
  authOperations,
  loginRateLimit,
  userDataRateLimit
} from '@/middlewares'
import { Router } from 'express'

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
  loginRateLimit,
  ...authOperations.login,
  AuthDependencies.controller.login
)

/**
 * GET /auth/me
 * Endpoint para obter informações do usuário autenticado
 */
AuthRoutes.get(
  '/me',
  userDataRateLimit,
  ...authOperations.me,
  AuthDependencies.controller.me
)

export { AuthRoutes }
