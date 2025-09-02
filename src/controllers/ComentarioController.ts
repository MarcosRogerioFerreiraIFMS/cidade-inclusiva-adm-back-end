import { IComentarioService } from '../interfaces/services/IComentarioService'
import { ControllerRequest } from '../types/RequestTypes'
import { HandleSuccess } from '../utils/HandleSuccess'

/**
 * Controller responsável pelo gerenciamento de comentários:
 * - Expõe endpoints para operações CRUD de comentários
 * Implementa funcionalidades para comentários relacionados a profissionais ou qualquer outro recurso
 */
export class ComentarioController {
  /**
   * @param {IComentarioService} comentarioService - Serviço de comentários injetado
   */
  constructor(private comentarioService: IComentarioService) {}

  /**
   * Cria um novo comentário
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const comentario = await this.comentarioService.create(req.body)
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
   * Lista todos os comentários cadastrados
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
   * - Lista todos os comentários de um profissional específico
   * - Inclui comentários visíveis e ocultos (para uso administrativo)
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
   * - Lista apenas os comentários visíveis de um profissional específico
   * - Filtra comentários que estão marcados como visíveis para exibição pública
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
}
