import { NoticiaController } from '../controllers/NoticiaController'
import { NoticiaDAO } from '../daos/NoticiaDAO'
import { NoticiaRepository } from '../repositories/NoticiaRepository'
import { NoticiaService } from '../services/NoticiaService'

const noticiaDAO = new NoticiaDAO()
const noticiaRepository = new NoticiaRepository(noticiaDAO)
const noticiaService = new NoticiaService(noticiaRepository)
const noticiaController = new NoticiaController(noticiaService)

const NoticiaDependencies = {
  controller: noticiaController,
  service: noticiaService,
  repository: noticiaRepository,
  dao: noticiaDAO
}

export { NoticiaDependencies }
