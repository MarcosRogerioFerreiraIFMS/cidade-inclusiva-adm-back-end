import { ComentarioController } from '@/controllers/ComentarioController'
import { ComentarioDAO } from '@/daos/ComentarioDAO'
import { ComentarioRepository } from '@/repositories/ComentarioRepository'
import { ComentarioService } from '@/services/ComentarioService'
import { AcessibilidadeUrbanaDependencies } from './AcessibilidadeUrbanaDependencies'
import { ManutencaoDependencies } from './ManutencaoDependencies'
import { MotoristaDependencies } from './MotoristaDependencies'
import { ProfissionalDependencies } from './ProfissionalDependencies'

const comentarioDAO = new ComentarioDAO()
const comentarioRepository = new ComentarioRepository(comentarioDAO)
const comentarioService = new ComentarioService(
  comentarioRepository,
  ProfissionalDependencies.repository,
  MotoristaDependencies.repository,
  ManutencaoDependencies.repository,
  AcessibilidadeUrbanaDependencies.repository
)
const comentarioController = new ComentarioController(comentarioService)

/**
 * Container de dependências para o módulo Comentario
 * Centraliza todas as instâncias relacionadas ao gerenciamento de comentários
 * Facilita a manutenção e testes através da inversão de controle
 */
export const ComentarioDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: comentarioController,
  /** Serviço responsável pelas regras de negócio */
  service: comentarioService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: comentarioRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: comentarioDAO
} as const
