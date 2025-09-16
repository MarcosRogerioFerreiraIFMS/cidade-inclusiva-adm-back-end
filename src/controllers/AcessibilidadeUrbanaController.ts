import type { IAcessibilidadeUrbanaService } from '@/interfaces/services'
import type { ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelo gerenciamento de acessibilidade urbana
 * - Implementa operações CRUD para entidades de acessibilidade urbana
 * - Gerencia validações e transformações de dados
 * - Coordena com services para operações de negócio
 */
export class AcessibilidadeUrbanaController {
  /**
   * Service de acessibilidade urbana
   * @private
   */
  private readonly acessibilidadeUrbanaService: IAcessibilidadeUrbanaService

  /**
   * Construtor do controller
   * @param {IAcessibilidadeUrbanaService} acessibilidadeUrbanaService - Service de acessibilidade urbana
   */
  constructor(acessibilidadeUrbanaService: IAcessibilidadeUrbanaService) {
    this.acessibilidadeUrbanaService = acessibilidadeUrbanaService
  }

  /**
   * Cria uma nova acessibilidade urbana
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const acessibilidadeUrbanaCriada =
        await this.acessibilidadeUrbanaService.create(req.body)

      HandleSuccess.created(res, acessibilidadeUrbanaCriada)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca uma acessibilidade urbana específica por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const acessibilidadeUrbana =
        await this.acessibilidadeUrbanaService.findById(id)

      HandleSuccess.found(res, acessibilidadeUrbana)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza uma acessibilidade urbana existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const acessibilidadeUrbanaAtualizada =
        await this.acessibilidadeUrbanaService.update(id, req.body)

      HandleSuccess.updated(res, acessibilidadeUrbanaAtualizada)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove uma acessibilidade urbana existente
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.acessibilidadeUrbanaService.delete(id)

      HandleSuccess.noContent(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todas as acessibilidades urbanas
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const acessibilidadesUrbanas =
        await this.acessibilidadeUrbanaService.findAll()

      HandleSuccess.list(res, acessibilidadesUrbanas)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca acessibilidade urbana por email
   * @type {ControllerRequest}
   */
  findByEmail: ControllerRequest = async (req, res, next) => {
    try {
      const { email } = req.params
      const acessibilidadeUrbana =
        await this.acessibilidadeUrbanaService.findByEmail(email)

      HandleSuccess.found(res, acessibilidadeUrbana)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca acessibilidades urbanas por categoria
   * @type {ControllerRequest}
   */
  findByCategoria: ControllerRequest = async (req, res, next) => {
    try {
      const { categoria } = req.params
      const acessibilidades =
        await this.acessibilidadeUrbanaService.findByCategoria(categoria)

      HandleSuccess.found(res, acessibilidades)
    } catch (error: unknown) {
      next(error)
    }
  }
}
