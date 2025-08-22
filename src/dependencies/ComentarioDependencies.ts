import { ComentarioController } from '../controllers/ComentarioController'
import { ComentarioDAO } from '../daos/ComentarioDAO'
import { ProfissionalDAO } from '../daos/ProfissionalDAO'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { ComentarioRepository } from '../repositories/ComentarioRepository'
import { ProfissionalRepository } from '../repositories/ProfissionalRepository'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { ComentarioService } from '../services/ComentarioService'

const comentarioDAO = new ComentarioDAO()
const usuarioDAO = new UsuarioDAO()
const profissionalDAO = new ProfissionalDAO()

const comentarioRepository = new ComentarioRepository(comentarioDAO)
const usuarioRepository = new UsuarioRepository(usuarioDAO)
const profissionalRepository = new ProfissionalRepository(profissionalDAO)

const comentarioService = new ComentarioService(
  comentarioRepository,
  usuarioRepository,
  profissionalRepository
)
const comentarioController = new ComentarioController(comentarioService)

const ComentarioDependencies = {
  controller: comentarioController,
  service: comentarioService,
  repository: comentarioRepository,
  dao: comentarioDAO
}

export { ComentarioDependencies }
