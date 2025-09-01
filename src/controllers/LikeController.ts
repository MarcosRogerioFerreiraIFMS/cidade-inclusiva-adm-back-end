import { ILikeService } from '../interfaces/services/ILikeService'
import { ControllerRequest } from '../types/RequestTypes'
import { HandleSuccess } from '../utils/HandleSuccess'

export class LikeController {
  constructor(private likeService: ILikeService) {}

  toggle: ControllerRequest = async (req, res, next) => {
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

  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const like = await this.likeService.findById(id)
      HandleSuccess.found(res, like)
    } catch (error: unknown) {
      next(error)
    }
  }

  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.likeService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  findByComentario: ControllerRequest = async (req, res, next) => {
    try {
      const { comentarioId } = req.params
      const likes = await this.likeService.findByComentario(comentarioId)
      HandleSuccess.list(res, likes)
    } catch (error: unknown) {
      next(error)
    }
  }

  findByUsuario: ControllerRequest = async (req, res, next) => {
    try {
      const { usuarioId } = req.params
      const likes = await this.likeService.findByUsuario(usuarioId)
      HandleSuccess.list(res, likes)
    } catch (error: unknown) {
      next(error)
    }
  }
}
