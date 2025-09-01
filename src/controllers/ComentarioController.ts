import { IComentarioService } from '../interfaces/services/IComentarioService'
import { ControllerRequest } from '../types/RequestTypes'
import { HandleSuccess } from '../utils/HandleSuccess'

export class ComentarioController {
  constructor(private comentarioService: IComentarioService) {}

  create: ControllerRequest = async (req, res, next) => {
    try {
      const comentario = await this.comentarioService.create(req.body)
      HandleSuccess.created(res, comentario, 'Comentário criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const comentario = await this.comentarioService.findById(id)
      HandleSuccess.found(res, comentario)
    } catch (error: unknown) {
      next(error)
    }
  }

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

  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.comentarioService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  findAll: ControllerRequest = async (_req, res, next) => {
    try {
      const comentarios = await this.comentarioService.findAll()
      HandleSuccess.list(res, comentarios)
    } catch (error: unknown) {
      next(error)
    }
  }

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
