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
 * @route POST /auth/login
 * @body {LoginCreateDTO} Dados de login (email, senha)
 * @returns {LoginResponseDTO} Token JWT e dados do usuário
 */
AuthRoutes.post(
  '/login',
  ...authOperations.login,
  AuthDependencies.controller.login
)

/**
 * GET /auth/validate-token
 * Endpoint para validação de token JWT
 * @route GET /auth/validate-token
 * @header {string} Authorization - Bearer token JWT
 * @returns {Object} Dados básicos do usuário (userId, email)
 */
AuthRoutes.get(
  '/validate-token',
  ...authOperations.validateToken,
  AuthDependencies.controller.validateToken
)

export { AuthRoutes }
