import { LikeController } from '../controllers/LikeController'
import { LikeDAO } from '../daos/LikeDAO'
import { LikeRepository } from '../repositories/LikeRepository'
import { LikeService } from '../services/LikeService'
import { ComentarioDependencies } from './ComentarioDependencies'
import { UsuarioDependencies } from './UsuarioDependencies'

const likeDAO = new LikeDAO()
const likeRepository = new LikeRepository(likeDAO)
const likeService = new LikeService(
  likeRepository,
  UsuarioDependencies.repository,
  ComentarioDependencies.repository
)
const likeController = new LikeController(likeService)

/**
 * Container de dependências para o módulo Like
 * Centraliza todas as instâncias relacionadas ao gerenciamento de likes
 * Facilita a manutenção e testes através da inversão de controle
 */
const LikeDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: likeController,
  /** Serviço responsável pelas regras de negócio */
  service: likeService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: likeRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: likeDAO
}

export { LikeDependencies }
