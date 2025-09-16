import { AcessibilidadeUrbanaController } from '@/controllers/AcessibilidadeUrbanaController'
import { AcessibilidadeUrbanaDAO } from '@/daos/AcessibilidadeUrbanaDAO'
import { AcessibilidadeUrbanaRepository } from '@/repositories/AcessibilidadeUrbanaRepository'
import { AcessibilidadeUrbanaService } from '@/services/AcessibilidadeUrbanaService'

/**
 * - Configuração das dependências para acessibilidade urbana
 * - Implementa padrão de injeção de dependência
 * - Centraliza a criação e configuração de todas as camadas
 */

/** DAO para acesso direto aos dados de acessibilidade urbana */
const acessibilidadeUrbanaDAO = new AcessibilidadeUrbanaDAO()

/** Repository para operações de acesso a dados de acessibilidade urbana */
const repository = new AcessibilidadeUrbanaRepository(acessibilidadeUrbanaDAO)

/** Service para lógica de negócio de acessibilidade urbana */
const service = new AcessibilidadeUrbanaService(repository)

/** Controller para operações HTTP de acessibilidade urbana */
const controller = new AcessibilidadeUrbanaController(service)

/**
 * Objeto com todas as dependências configuradas para acessibilidade urbana
 * Exportação das instâncias para uso em toda a aplicação
 */
export const AcessibilidadeUrbanaDependencies = {
  dao: acessibilidadeUrbanaDAO,
  repository,
  service,
  controller
} as const
