import { AuthController } from '@/controllers/AuthController'
import { AuthService } from '@/services/AuthService'
import { UsuarioDependencies } from './UsuarioDependencies'

const authService = new AuthService(UsuarioDependencies.repository)
const authController = new AuthController(authService)

/**
 * Container de dependências para operações de autenticação
 * Centraliza as instâncias configuradas de controller e service
 */
export const AuthDependencies = {
  /** Controller de autenticação configurado */
  controller: authController,
  /** Serviço de autenticação configurado */
  service: authService
} as const
