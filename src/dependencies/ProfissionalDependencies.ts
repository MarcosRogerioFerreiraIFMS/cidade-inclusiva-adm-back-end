import { ProfissionalController } from '../controllers/ProfissionalController'
import { ProfissionalDAO } from '../daos/ProfissionalDAO'
import { ProfissionalRepository } from '../repositories/ProfissionalRepository'
import { ProfissionalService } from '../services/ProfissionalService'

const profissionalDAO = new ProfissionalDAO()
const profissionalRepository = new ProfissionalRepository(profissionalDAO)
const profissionalService = new ProfissionalService(profissionalRepository)
const profissionalController = new ProfissionalController(profissionalService)

/**
 * Container de dependências para o módulo Profissional
 * Centraliza todas as instâncias relacionadas ao gerenciamento de profissionais
 * Facilita a manutenção e testes através da inversão de controle
 */
const ProfissionalDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: profissionalController,
  /** Serviço responsável pelas regras de negócio */
  service: profissionalService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: profissionalRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: profissionalDAO
}

export { ProfissionalDependencies }
