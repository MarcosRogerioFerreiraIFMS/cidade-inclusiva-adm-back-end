import { TipoEntidadeComentario } from '@/enums'
import type { IComentarioService } from '@/interfaces/services'
import type { AuthenticatedRequest, ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelo gerenciamento de comentários
 */
export class ComentarioController {
  constructor(private comentarioService: IComentarioService) {}

  /**
   * Cria um novo comentário para uma entidade específica
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
  findById: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentario = await this.comentarioService.findById(id, req.user)
      HandleSuccess.found(res, comentario)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza um comentário existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest<AuthenticatedRequest> = async (req, res, next) => {
    try {
      const { id } = req.params
      const comentario = await this.comentarioService.update(
        id,
        req.body,
        req.user
      )
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
   * Busca comentários de um profissional
   * @type {ControllerRequest}
   */
  findByProfissional: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentarios = await this.comentarioService.findByEntidade(
        TipoEntidadeComentario.PROFISSIONAL,
        id,
        req.user
      )
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca comentários de um motorista
   * @type {ControllerRequest}
   */
  findByMotorista: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentarios = await this.comentarioService.findByEntidade(
        TipoEntidadeComentario.MOTORISTA,
        id,
        req.user
      )
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca comentários de uma manutenção
   * @type {ControllerRequest}
   */
  findByManutencao: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentarios = await this.comentarioService.findByEntidade(
        TipoEntidadeComentario.MANUTENCAO,
        id,
        req.user
      )
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca comentários de uma acessibilidade urbana
   * @type {ControllerRequest}
   */
  findByAcessibilidadeUrbana: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentarios = await this.comentarioService.findByEntidade(
        TipoEntidadeComentario.ACESSIBILIDADE_URBANA,
        id,
        req.user
      )
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Alterna a visibilidade de um comentário (toggle)
   * @type {ControllerRequest}
   */
  toggleVisibility: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentario = await this.comentarioService.toggleVisibility(
        id,
        req.user
      )
      HandleSuccess.updated(
        res,
        comentario,
        'Visibilidade do comentário alterada com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca comentários feitos por um usuário
   * @type {ControllerRequest}
   */
  findByUsuario: ControllerRequest<AuthenticatedRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const { id } = req.params
      const comentarios = await this.comentarioService.findByUsuario(
        id,
        req.user
      )
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }
}
