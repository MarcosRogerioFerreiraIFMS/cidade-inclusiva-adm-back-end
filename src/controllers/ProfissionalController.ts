import type { IProfissionalService } from '@/interfaces/services'
import type { ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelo gerenciamento de profissionais
 */
export class ProfissionalController {
  constructor(private profissionalService: IProfissionalService) {}

  /**
   * Cria um novo profissional
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const profissional = await this.profissionalService.create(req.body)

      HandleSuccess.created(
        res,
        profissional,
        'Profissional criado com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um profissional específico pelo ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const profissional = await this.profissionalService.findById(id)

      HandleSuccess.found(res, profissional)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza um profissional existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const profissional = await this.profissionalService.update(id, req.body)

      HandleSuccess.updated(
        res,
        profissional,
        'Profissional atualizado com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove um profissional do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.profissionalService.delete(id)

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os profissionais cadastrados
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const profissionais = await this.profissionalService.findAll()

      HandleSuccess.list(res, profissionais)
    } catch (error: unknown) {
      next(error)
    }
  }
}
