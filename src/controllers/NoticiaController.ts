import { NextFunction, Request, Response } from 'express'
import { INoticiaService } from '../interfaces/services/INoticiaService'
import { HandleSuccess } from '../utils/HandleSuccess'

export class NoticiaController {
  constructor(private noticiaService: INoticiaService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const noticia = await this.noticiaService.create(req.body)
      HandleSuccess.created(res, noticia, 'Notícia criada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const noticia = await this.noticiaService.findById(id)
      HandleSuccess.found(res, noticia)
    } catch (error: unknown) {
      next(error)
    }
  }

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const noticia = await this.noticiaService.update(id, req.body)
      HandleSuccess.updated(res, noticia, 'Notícia atualizada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      await this.noticiaService.delete(id)
      HandleSuccess.deleted(res, 'Notícia deletada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  findAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const noticias = await this.noticiaService.findAll()
      HandleSuccess.list(res, noticias)
    } catch (error: unknown) {
      next(error)
    }
  }
}
