import { NextFunction, Request, Response } from 'express'
import { IComentarioService } from '../interfaces/services/IComentarioService'
import { HandleSuccess } from '../utils/HandleSuccess'

export class ComentarioController {
  constructor(private comentarioService: IComentarioService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const comentario = await this.comentarioService.create(req.body)
      HandleSuccess.created(res, comentario, 'Comentário criado com sucesso')
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
      const comentario = await this.comentarioService.findById(id)
      HandleSuccess.found(res, comentario)
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
      const comentario = await this.comentarioService.update(id, req.body)
      HandleSuccess.updated(
        res,
        comentario,
        'Comentário atualizado com sucesso'
      )
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
      await this.comentarioService.delete(id)
      HandleSuccess.deleted(res)
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
      const comentarios = await this.comentarioService.findAll()
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  findByProfissional = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { profissionalId } = req.params
      const comentarios = await this.comentarioService.findByProfissional(
        profissionalId
      )
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  findVisibleByProfissional = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { profissionalId } = req.params
      const comentarios =
        await this.comentarioService.findVisibleByProfissional(profissionalId)
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }
}
