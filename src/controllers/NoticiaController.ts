import { INoticiaService } from '../interfaces/services/INoticiaService'
import { ControllerRequest } from '../types/RequestTypes'
import { HandleSuccess } from '../utils/HandleSuccess'

export class NoticiaController {
  constructor(private noticiaService: INoticiaService) {}

  create: ControllerRequest = async (req, res, next) => {
    try {
      const noticia = await this.noticiaService.create(req.body)
      HandleSuccess.created(res, noticia, 'Notícia criada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const noticia = await this.noticiaService.findById(id)
      HandleSuccess.found(res, noticia)
    } catch (error: unknown) {
      next(error)
    }
  }

  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const noticia = await this.noticiaService.update(id, req.body)
      HandleSuccess.updated(res, noticia, 'Notícia atualizada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.noticiaService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const noticias = await this.noticiaService.findAll()
      HandleSuccess.list(res, noticias)
    } catch (error: unknown) {
      next(error)
    }
  }
}
