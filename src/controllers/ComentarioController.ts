import type { IComentarioService } from '@/interfaces/services'
import type { AuthenticatedRequest, ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelo gerenciamento de comentários
 */
export class ComentarioController {
  constructor(private comentarioService: IComentarioService) {}

  /**
   * Cria um novo comentário
   * @type {ControllerRequest}
   */
  create: ControllerRequest<AuthenticatedRequest> = async (req, res, next) => {
    try {
      const comentario = await this.comentarioService.create(req.body, req.user)
      HandleSuccess.created(res, comentario, 'Comentário criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um comentário específico pelo ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const comentario = await this.comentarioService.findById(id)
      HandleSuccess.found(res, comentario)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza um comentário existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
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

  /**
   * Remove um comentário do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.comentarioService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os comentários do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (_req, res, next) => {
    try {
      const comentarios = await this.comentarioService.findAll()
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os comentários visíveis
   * @type {ControllerRequest}
   */
  findVisible: ControllerRequest = async (_req, res, next) => {
    try {
      const comentarios = await this.comentarioService.findVisible()
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista comentários por profissional
   * @type {ControllerRequest}
   */
  findByProfissional: ControllerRequest = async (req, res, next) => {
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

  /**
   * Lista comentários visíveis por profissional
   * @type {ControllerRequest}
   */
  findVisibleByProfissional: ControllerRequest = async (req, res, next) => {
    try {
      const { profissionalId } = req.params
      const comentarios =
        await this.comentarioService.findVisibleByProfissional(profissionalId)
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista comentários por usuário
   * @type {ControllerRequest}
   */
  findByUsuario: ControllerRequest = async (req, res, next) => {
    try {
      const { usuarioId } = req.params
      const comentarios = await this.comentarioService.findByUsuario(usuarioId)
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }
}
