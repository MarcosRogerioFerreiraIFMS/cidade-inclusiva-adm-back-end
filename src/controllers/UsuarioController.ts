import type { IUsuarioService } from '@/interfaces/services'
import type { ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

/**
 * Controller responsável pelas operações CRUD de usuários
 */
export class UsuarioController {
  constructor(private usuarioService: IUsuarioService) {}

  /**
   * Cria um novo usuário no sistema
   * @type {ControllerRequest}
   */
  create: ControllerRequest = async (req, res, next) => {
    try {
      const usuario = await this.usuarioService.create(req.body)

      HandleSuccess.created(res, usuario, 'Usuário criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um usuário específico por ID
   * @type {ControllerRequest}
   */
  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const usuario = await this.usuarioService.findById(id)

      HandleSuccess.found(res, usuario)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca um usuário específico por email
   * @type {ControllerRequest}
   */
  findByEmail: ControllerRequest = async (req, res, next) => {
    try {
      const { email } = req.params
      const usuario = await this.usuarioService.findByEmail(email)

      HandleSuccess.found(res, usuario)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Atualiza os dados de um usuário existente
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const usuario = await this.usuarioService.update(id, req.body)

      HandleSuccess.updated(res, usuario, 'Usuário atualizado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Remove um usuário do sistema
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.usuarioService.delete(id)

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os usuários do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (req, res, next) => {
    try {
      const usuarios = await this.usuarioService.findAll()

      HandleSuccess.list(res, usuarios)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Cria um novo administrador no sistema
   * @type {ControllerRequest}
   */
  createAdmin: ControllerRequest = async (req, res, next) => {
    try {
      const admin = await this.usuarioService.createAdmin(req.body)

      HandleSuccess.created(res, admin, 'Administrador criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }
}
