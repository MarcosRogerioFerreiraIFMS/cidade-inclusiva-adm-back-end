import type { INoticiaService } from '@/interfaces/services'
import type { ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelas operações CRUD de notícias
 */
export class NoticiaController {
  constructor(private noticiaService: INoticiaService) {}

  /**
   * Cria uma nova notícia no sistema
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const noticia = await this.noticiaService.create(req.body)

      HandleSuccess.created(res, noticia, 'Notícia criada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca uma notícia específica por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const noticia = await this.noticiaService.findById(id)

      HandleSuccess.found(res, noticia)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza os dados de uma notícia existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const noticia = await this.noticiaService.update(id, req.body)

      HandleSuccess.updated(res, noticia, 'Notícia atualizada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove uma notícia do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.noticiaService.delete(id)

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todas as notícias do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const noticias = await this.noticiaService.findAll()

      HandleSuccess.list(res, noticias)
    } catch (error: unknown) {
      next(error)
    }
  }
}
