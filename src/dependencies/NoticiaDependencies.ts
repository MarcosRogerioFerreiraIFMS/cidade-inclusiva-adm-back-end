import { NoticiaController } from '@/controllers/NoticiaController'
import { NoticiaDAO } from '@/daos/NoticiaDAO'
import { NoticiaRepository } from '@/repositories/NoticiaRepository'
import { NoticiaService } from '@/services/NoticiaService'

const noticiaDAO = new NoticiaDAO()
const noticiaRepository = new NoticiaRepository(noticiaDAO)
const noticiaService = new NoticiaService(noticiaRepository)
const noticiaController = new NoticiaController(noticiaService)

/**
 * Container de dependências para o módulo Noticia
 * Centraliza todas as instâncias relacionadas ao gerenciamento de notícias
 * Facilita a manutenção e testes através da inversão de controle
 */
const NoticiaDependencies = {
  /** Controlador responsável pelo tratamento das requisições HTTP */
  controller: noticiaController,
  /** Serviço responsável pelas regras de negócio */
  service: noticiaService,
  /** Repositório responsável pela lógica de acesso aos dados */
  repository: noticiaRepository,
  /** DAO responsável pelas operações diretas no banco de dados */
  dao: noticiaDAO
}

export { NoticiaDependencies }
