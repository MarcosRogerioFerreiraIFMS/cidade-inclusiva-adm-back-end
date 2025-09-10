import { ManutencaoController } from '@/controllers/ManutencaoController'
import { ManutencaoDAO } from '@/daos/ManutencaoDAO'
import { ManutencaoRepository } from '@/repositories/ManutencaoRepository'
import { ManutencaoService } from '@/services/ManutencaoService'

const manutencaoDAO = new ManutencaoDAO()
const manutencaoRepository = new ManutencaoRepository(manutencaoDAO)
const manutencaoService = new ManutencaoService(manutencaoRepository)
const manutencaoController = new ManutencaoController(manutencaoService)

/**
 * Container de dependências para o módulo Manutenção
 * Centraliza todas as instâncias relacionadas ao gerenciamento de manutenções
 * Facilita a manutenção e testes através da inversão de controle
 */
const ManutencaoDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: manutencaoController,
  /** Serviço responsável pelas regras de negócio */
  service: manutencaoService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: manutencaoRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: manutencaoDAO
}

export { ManutencaoDependencies }
