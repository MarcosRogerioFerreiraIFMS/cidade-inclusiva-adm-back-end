import { ProfissionalController } from '../controllers/ProfissionalController'
import { ProfissionalDAO } from '../daos/ProfissionalDAO'
import { ProfissionalRepository } from '../repositories/ProfissionalRepository'
import { ProfissionalService } from '../services/ProfissionalService'

const profissionalDAO = new ProfissionalDAO()
const profissionalRepository = new ProfissionalRepository(profissionalDAO)
const profissionalService = new ProfissionalService(profissionalRepository)
const profissionalController = new ProfissionalController(profissionalService)

const ProfissionalDependencies = {
  controller: profissionalController,
  service: profissionalService,
  repository: profissionalRepository,
  dao: profissionalDAO
}

export { ProfissionalDependencies }
