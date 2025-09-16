import type { IMotoristaService } from '@/interfaces/services'
import type { ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelas operações CRUD de motoristas
 */
export class MotoristaController {
  constructor(private motoristaService: IMotoristaService) {}

  /**
   * Cria um novo motorista no sistema
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const motorista = await this.motoristaService.create(req.body)

      HandleSuccess.created(res, motorista, 'Motorista criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um motorista específico por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const motorista = await this.motoristaService.findById(id)

      HandleSuccess.found(res, motorista)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza os dados de um motorista existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const motorista = await this.motoristaService.update(id, req.body)

      HandleSuccess.updated(res, motorista, 'Motorista atualizado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove um motorista do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.motoristaService.delete(id)

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os motoristas do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const motoristas = await this.motoristaService.findAll()

      HandleSuccess.list(res, motoristas)
    } catch (error: unknown) {
      next(error)
    }
  }
}
