import { AuthController } from '../controllers/AuthController'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { AuthService } from '../services/AuthService'

const usuarioDAO = new UsuarioDAO()

const usuarioRepository = new UsuarioRepository(usuarioDAO)
const authService = new AuthService(usuarioRepository)
const authController = new AuthController(authService)

const AuthDependencies = {
  controller: authController,
  service: authService
}

export { AuthDependencies }
