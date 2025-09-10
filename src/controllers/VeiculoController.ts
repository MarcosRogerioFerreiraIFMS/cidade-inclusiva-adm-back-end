import { IVeiculoService } from '@/interfaces/services'
import { ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelas operações CRUD de veículos
 */
export class VeiculoController {
  constructor(private veiculoService: IVeiculoService) {}

  /**
   * Cria um novo veículo no sistema
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const veiculo = await this.veiculoService.create(req.body)

      HandleSuccess.created(res, veiculo, 'Veículo criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um veículo específico por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const veiculo = await this.veiculoService.findById(id)

      HandleSuccess.found(res, veiculo)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza os dados de um veículo existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const veiculo = await this.veiculoService.update(id, req.body)

      HandleSuccess.updated(res, veiculo, 'Veículo atualizado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove um veículo do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.veiculoService.delete(id)

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os veículos do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const veiculos = await this.veiculoService.findAll()

      HandleSuccess.list(res, veiculos)
    } catch (error: unknown) {
      next(error)
    }
  }
}
