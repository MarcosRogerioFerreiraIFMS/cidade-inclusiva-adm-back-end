import { ComentarioController } from '../controllers/ComentarioController'
import { ComentarioDAO } from '../daos/ComentarioDAO'
import { ProfissionalDAO } from '../daos/ProfissionalDAO'
import { ComentarioRepository } from '../repositories/ComentarioRepository'
import { ProfissionalRepository } from '../repositories/ProfissionalRepository'
import { ComentarioService } from '../services/ComentarioService'

const comentarioDAO = new ComentarioDAO()
const profissionalDAO = new ProfissionalDAO()

const comentarioRepository = new ComentarioRepository(comentarioDAO)
const profissionalRepository = new ProfissionalRepository(profissionalDAO)

const comentarioService = new ComentarioService(
  comentarioRepository,
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
