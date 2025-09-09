import { MotoristaController } from '../controllers/MotoristaController'
import { MotoristaDAO } from '../daos/MotoristaDAO'
import { MotoristaRepository } from '../repositories/MotoristaRepository'
import { MotoristaService } from '../services/MotoristaService'

const motoristaDAO = new MotoristaDAO()
const motoristaRepository = new MotoristaRepository(motoristaDAO)
const motoristaService = new MotoristaService(motoristaRepository)
const motoristaController = new MotoristaController(motoristaService)

/**
 * Container de dependências para o módulo Motorista
 * Centraliza todas as instâncias relacionadas ao gerenciamento de motoristas
 * Facilita a manutenção e testes através da inversão de controle
 */
const MotoristaDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: motoristaController,
  /** Serviço responsável pelas regras de negócio */
  service: motoristaService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: motoristaRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: motoristaDAO
}

export { MotoristaDependencies }
