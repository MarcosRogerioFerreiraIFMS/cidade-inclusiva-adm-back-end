import { UsuarioController } from '@/controllers/UsuarioController'
import { UsuarioDAO } from '@/daos/UsuarioDAO'
import { UsuarioRepository } from '@/repositories/UsuarioRepository'
import { UsuarioService } from '@/services/UsuarioService'

const usuarioDAO = new UsuarioDAO()
const usuarioRepository = new UsuarioRepository(usuarioDAO)
const usuarioService = new UsuarioService(usuarioRepository)
const usuarioController = new UsuarioController(usuarioService)

/**
 * Container de dependências para o módulo Usuario
 * Centraliza todas as instâncias relacionadas ao gerenciamento de usuários
 * Facilita a manutenção e testes através da inversão de controle
 */
const UsuarioDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: usuarioController,
  /** Serviço responsável pelas regras de negócio */
  service: usuarioService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: usuarioRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: usuarioDAO
}

export { UsuarioDependencies }
