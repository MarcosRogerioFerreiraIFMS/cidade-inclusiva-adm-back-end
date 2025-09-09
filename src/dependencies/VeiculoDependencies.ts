import { VeiculoController } from '../controllers/VeiculoController'
import { VeiculoDAO } from '../daos/VeiculoDAO'
import { VeiculoRepository } from '../repositories/VeiculoRepository'
import { VeiculoService } from '../services/VeiculoService'
import { MotoristaDependencies } from './MotoristaDependencies'

const veiculoDAO = new VeiculoDAO()
const veiculoRepository = new VeiculoRepository(veiculoDAO)
const veiculoService = new VeiculoService(
  veiculoRepository,
  MotoristaDependencies.repository
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
