import type { ILikeService } from '@/interfaces/services'
import type { AuthenticatedRequest, ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelo gerenciamento de likes
 */
export class LikeController {
  constructor(private likeService: ILikeService) {}

  /**
   * Alterna o estado de like de um usuário em um comentário (toggle like/unlike)
   * @type {ControllerRequest}
   */
  toggle: ControllerRequest<AuthenticatedRequest> = async (req, res, next) => {
    try {
      const { comentarioId } = req.params
      const result = await this.likeService.toggle(comentarioId, req.user!)

      const message = result.liked
        ? 'Like adicionado com sucesso'
        : 'Like removido com sucesso'
      HandleSuccess.updated(res, result, message)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um like específico pelo ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const like = await this.likeService.findById(id)
      HandleSuccess.found(res, like)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove um like do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.likeService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os likes de um comentário específico
   * @type {ControllerRequest}
   */
  findByComentario: ControllerRequest = async (req, res, next) => {
    try {
      const { comentarioId } = req.params
      const likes = await this.likeService.findByComentario(comentarioId)
      HandleSuccess.list(res, likes)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os likes dados por um usuário específico
   * @type {ControllerRequest}
   */
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
