import { LikeController } from '../controllers/LikeController'
import { ComentarioDAO } from '../daos/ComentarioDAO'
import { LikeDAO } from '../daos/LikeDAO'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { ComentarioRepository } from '../repositories/ComentarioRepository'
import { LikeRepository } from '../repositories/LikeRepository'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { LikeService } from '../services/LikeService'

const likeDAO = new LikeDAO()
const usuarioDAO = new UsuarioDAO()
const comentarioDAO = new ComentarioDAO()

const likeRepository = new LikeRepository(likeDAO)
const usuarioRepository = new UsuarioRepository(usuarioDAO)
const comentarioRepository = new ComentarioRepository(comentarioDAO)

const likeService = new LikeService(
  likeRepository,
  usuarioRepository,
  comentarioRepository
)
const likeController = new LikeController(likeService)

const LikeDependencies = {
  controller: likeController,
  service: likeService,
  repository: likeRepository,
  dao: likeDAO
}

export { LikeDependencies }
