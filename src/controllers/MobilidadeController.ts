import { IMobilidadeService } from '../interfaces/services'
import { AuthenticatedRequest, ControllerRequest } from '../types'
import { HandleSuccess } from '../utils'

/**
 * Controller responsável pelas operações CRUD de mobilidades
 */
export class MobilidadeController {
  constructor(private mobilidadeService: IMobilidadeService) {}

  /**
   * Cria uma nova mobilidade no sistema
   * @type {ControllerRequest<AuthenticatedRequest>}
   */
  create: ControllerRequest<AuthenticatedRequest> = async (req, res, next) => {
    try {
      const mobilidade = await this.mobilidadeService.create(req.body, req.user)
      HandleSuccess.created(res, mobilidade, 'Mobilidade criada com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca uma mobilidade específica por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const mobilidade = await this.mobilidadeService.findById(id)
      HandleSuccess.found(res, mobilidade)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza os dados de uma mobilidade existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const mobilidade = await this.mobilidadeService.update(id, req.body)
      HandleSuccess.updated(
        res,
        mobilidade,
        'Mobilidade atualizada com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove uma mobilidade do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.mobilidadeService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todas as mobilidades do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (_req, res, next) => {
    try {
      const mobilidades = await this.mobilidadeService.findAll()
      HandleSuccess.list(res, mobilidades)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca mobilidades por usuário
   * @type {ControllerRequest}
   */
  findByUsuario: ControllerRequest = async (req, res, next) => {
    try {
      const { usuarioId } = req.params
      const mobilidades = await this.mobilidadeService.findByUsuario(usuarioId)
      HandleSuccess.list(res, mobilidades)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca mobilidades por status
   * @type {ControllerRequest}
   */
  findByStatus: ControllerRequest = async (req, res, next) => {
    try {
      const { status } = req.params
      const mobilidades = await this.mobilidadeService.findByStatus(status)
      HandleSuccess.list(res, mobilidades)
    } catch (error: unknown) {
      next(error)
    }
  }
}
