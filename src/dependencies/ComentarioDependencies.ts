import { ComentarioController } from '../controllers/ComentarioController'
import { ComentarioDAO } from '../daos/ComentarioDAO'
import { ProfissionalDAO } from '../daos/ProfissionalDAO'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { ComentarioRepository } from '../repositories/ComentarioRepository'
import { ProfissionalRepository } from '../repositories/ProfissionalRepository'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { ComentarioService } from '../services/ComentarioService'

/**
 * Instâncias das dependências do módulo Comentario
 * Implementa o padrão de injeção de dependência seguindo a arquitetura em camadas
 * Inclui dependências de usuário e profissional para validações de relacionamento
 */
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

/**
 * Container de dependências para o módulo Comentario
 * Centraliza todas as instâncias relacionadas ao gerenciamento de comentários
 * Facilita a manutenção e testes através da inversão de controle
 */
const ComentarioDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: comentarioController,
  /** Serviço responsável pelas regras de negócio */
  service: comentarioService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: comentarioRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: comentarioDAO
}

export { ComentarioDependencies }
