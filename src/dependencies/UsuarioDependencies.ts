import { UsuarioController } from '../controllers/UsuarioController'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { UsuarioService } from '../services/UsuarioService'

const usuarioDAO = new UsuarioDAO()
const usuarioRepository = new UsuarioRepository(usuarioDAO)
const usuarioService = new UsuarioService(usuarioRepository)
const usuarioController = new UsuarioController(usuarioService)

const UsuarioDependencies = {
  controller: usuarioController,
  service: usuarioService,
  repository: usuarioRepository,
  dao: usuarioDAO
}

export { UsuarioDependencies }
