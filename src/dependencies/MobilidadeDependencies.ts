import { MobilidadeController } from '@/controllers/MobilidadeController'
import { MobilidadeDAO } from '@/daos/MobilidadeDAO'
import { MobilidadeRepository } from '@/repositories/MobilidadeRepository'
import { MobilidadeService } from '@/services/MobilidadeService'
import { UsuarioDependencies } from './UsuarioDependencies'

const mobilidadeDAO = new MobilidadeDAO()
const mobilidadeRepository = new MobilidadeRepository(mobilidadeDAO)
const mobilidadeService = new MobilidadeService(
  mobilidadeRepository,
  UsuarioDependencies.repository
)
const mobilidadeController = new MobilidadeController(mobilidadeService)

/**
 * Container de dependências para o módulo Mobilidade
 * Centraliza todas as instâncias relacionadas ao gerenciamento de mobilidades
 * Facilita a manutenção e testes através da inversão de controle
 */
export const MobilidadeDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: mobilidadeController,
  /** Serviço responsável pelas regras de negócio */
  service: mobilidadeService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: mobilidadeRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: mobilidadeDAO
} as const
