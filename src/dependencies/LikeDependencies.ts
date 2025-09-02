import { LikeController } from '../controllers/LikeController'
import { ComentarioDAO } from '../daos/ComentarioDAO'
import { LikeDAO } from '../daos/LikeDAO'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { ComentarioRepository } from '../repositories/ComentarioRepository'
import { LikeRepository } from '../repositories/LikeRepository'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { LikeService } from '../services/LikeService'

/**
 * Instâncias das dependências do módulo Like
 * Implementa o padrão de injeção de dependência seguindo a arquitetura em camadas
 * Inclui dependências de usuário e comentário para validações de relacionamento
 */
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
