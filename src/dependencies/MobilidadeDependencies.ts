import { MobilidadeController } from '../controllers/MobilidadeController'
import { MobilidadeDAO } from '../daos/MobilidadeDAO'
import { UsuarioDAO } from '../daos/UsuarioDAO'
import { MobilidadeRepository } from '../repositories/MobilidadeRepository'
import { UsuarioRepository } from '../repositories/UsuarioRepository'
import { MobilidadeService } from '../services/MobilidadeService'

/**
 * Instâncias das dependências do módulo Mobilidade
 * Implementa o padrão de injeção de dependência seguindo a arquitetura em camadas
 */
const mobilidadeDAO = new MobilidadeDAO()
const usuarioDAO = new UsuarioDAO()

const mobilidadeRepository = new MobilidadeRepository(mobilidadeDAO)
const usuarioRepository = new UsuarioRepository(usuarioDAO)

const mobilidadeService = new MobilidadeService(
  mobilidadeRepository,
  usuarioRepository
)
const mobilidadeController = new MobilidadeController(mobilidadeService)

/**
 * Container de dependências para o módulo Mobilidade
 * Centraliza todas as instâncias relacionadas ao gerenciamento de mobilidades
 * Facilita a manutenção e testes através da inversão de controle
 */
const MobilidadeDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: mobilidadeController,
  /** Serviço responsável pelas regras de negócio */
  service: mobilidadeService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: mobilidadeRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: mobilidadeDAO
}

export { MobilidadeDependencies }
