import { NextFunction, Request, Response } from 'express'
import { ILikeService } from '../interfaces/services/ILikeService'
import { HandleSuccess } from '../utils/HandleSuccess'

export class LikeController {
  constructor(private likeService: ILikeService) {}

  toggle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { usuarioId, comentarioId } = req.params
      const result = await this.likeService.toggle(usuarioId, comentarioId)

      const message = result.liked
        ? 'Like adicionado com sucesso'
        : 'Like removido com sucesso'
      HandleSuccess.updated(res, result, message)
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
      const like = await this.likeService.findById(id)
      HandleSuccess.found(res, like)
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
      await this.likeService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  findByComentario = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { comentarioId } = req.params
      const likes = await this.likeService.findByComentario(comentarioId)
      HandleSuccess.list(res, likes)
    } catch (error: unknown) {
      next(error)
    }
  }

  findByUsuario = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { usuarioId } = req.params
      const likes = await this.likeService.findByUsuario(usuarioId)
      HandleSuccess.list(res, likes)
    } catch (error: unknown) {
      next(error)
    }
  }
}
