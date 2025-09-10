import { IManutencaoService } from '@/interfaces/services/IManutencaoService'
import { ControllerRequest } from '@/types/RequestTypes'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelas operações CRUD de manutenções
 */
export class ManutencaoController {
  constructor(private manutencaoService: IManutencaoService) {}

  /**
   * Cria uma nova manutenção no sistema
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const manutencao = await this.manutencaoService.create(req.body)

      HandleSuccess.created(
        res,
        manutencao,
        'Empresa de manutenção criada com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca uma manutenção específica por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const manutencao = await this.manutencaoService.findById(id)

      HandleSuccess.found(res, manutencao)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca uma manutenção específica por email
   * @type {ControllerRequest}
   */
  findByEmail: ControllerRequest = async (req, res, next) => {
    try {
      const { email } = req.params
      const manutencao = await this.manutencaoService.findByEmail(email)

      HandleSuccess.found(res, manutencao)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza os dados de uma manutenção existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const manutencao = await this.manutencaoService.update(id, req.body)

      HandleSuccess.updated(
        res,
        manutencao,
        'Empresa de manutenção atualizada com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove uma manutenção do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.manutencaoService.delete(id)

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todas as manutenções do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const manutencoes = await this.manutencaoService.findAll()

      HandleSuccess.list(res, manutencoes)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca manutenções por especialidade
   * @type {ControllerRequest}
   */
  findByEspecialidade: ControllerRequest = async (req, res, next) => {
    try {
      const { especialidade } = req.params
      const manutencoes = await this.manutencaoService.findByEspecialidade(
        especialidade
      )

      HandleSuccess.list(res, manutencoes)
    } catch (error: unknown) {
      next(error)
    }
  }
}
