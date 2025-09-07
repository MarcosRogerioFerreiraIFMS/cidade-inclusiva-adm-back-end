import { VeiculoController } from '../controllers/VeiculoController'
import { MotoristaDAO } from '../daos/MotoristaDAO'
import { VeiculoDAO } from '../daos/VeiculoDAO'
import { MotoristaRepository } from '../repositories/MotoristaRepository'
import { VeiculoRepository } from '../repositories/VeiculoRepository'
import { VeiculoService } from '../services/VeiculoService'

/**
 * Instâncias das dependências do módulo Veículo
 * Implementa o padrão de injeção de dependência seguindo a arquitetura em camadas
 */
const veiculoDAO = new VeiculoDAO()
const motoristaDAO = new MotoristaDAO()

const motoristaRepository = new MotoristaRepository(motoristaDAO)
const veiculoRepository = new VeiculoRepository(veiculoDAO)

const veiculoService = new VeiculoService(
  veiculoRepository,
  motoristaRepository
)
const veiculoController = new VeiculoController(veiculoService)

/**
 * Container de dependências para o módulo Veículo
 * Centraliza todas as instâncias relacionadas ao gerenciamento de veículos
 * Facilita a manutenção e testes através da inversão de controle
 */
const VeiculoDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: veiculoController,
  /** Serviço responsável pelas regras de negócio */
  service: veiculoService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: veiculoRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: veiculoDAO
}

export { VeiculoDependencies }
