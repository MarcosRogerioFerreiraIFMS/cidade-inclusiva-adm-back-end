import { AuthController } from '../controllers/AuthController'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { AuthService } from '../services/AuthService'

/**
 * Instância do DAO de usuários para acesso aos dados
 */
const usuarioDAO = new UsuarioDAO()

/**
 * Instância do repositório de usuários com DAO injetado
 */
const usuarioRepository = new UsuarioRepository(usuarioDAO)

/**
 * Instância do serviço de autenticação com repositório injetado
 */
const authService = new AuthService(usuarioRepository)

/**
 * Instância do controller de autenticação com serviço injetado
 */
const authController = new AuthController(authService)

/**
 * Container de dependências para operações de autenticação
 * Centraliza as instâncias configuradas de controller e service
 */
const AuthDependencies = {
  /** Controller de autenticação configurado */
  controller: authController,
  /** Serviço de autenticação configurado */
  service: authService
}

export { AuthDependencies }
