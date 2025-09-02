import { TipoRecurso } from '@prisma/client'
import { IUsuarioService } from '../interfaces/services/IUsuarioService'
import { ControllerRequest } from '../types/RequestTypes'
import { AuditLogger } from '../utils/auditLogger'
import { HandleSuccess } from '../utils/HandleSuccess'

/**
 * Controller responsável pelas operações CRUD de usuários:
 * - Gerencia requisições HTTP para criação, consulta, atualização e remoção de usuários
 */
export class UsuarioController {
  /**
   * @param {IUsuarioService} usuarioService - Serviço de usuários injetado
   */
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
   * Atualiza os dados de um usuário existente:
   * - Registra a operação no log de auditoria
   * @type {ControllerRequest}
   */
  update: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params

      // Buscar dados atuais antes da atualização para auditoria
      const usuarioAtual = await this.usuarioService.findById(id)

      const usuario = await this.usuarioService.update(id, req.body)

      // Log de auditoria
      await AuditLogger.logUpdate(
        req,
        TipoRecurso.USUARIO,
        id,
        usuarioAtual as unknown as Record<string, unknown>,
        usuario as unknown as Record<string, unknown>
      )

      HandleSuccess.updated(res, usuario, 'Usuário atualizado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * - Remove um usuário do sistema
   * - Registra a operação no log de auditoria
   * @type {ControllerRequest}
   */
  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params

      // Buscar dados antes de deletar para auditoria
      const usuarioParaDeletar = await this.usuarioService.findById(id)

      await this.usuarioService.delete(id)

      // Log de auditoria
      await AuditLogger.logDelete(
        req,
        TipoRecurso.USUARIO,
        id,
        usuarioParaDeletar as unknown as Record<string, unknown>
      )

      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Lista todos os usuários do sistema
   * @type {ControllerRequest}
   */
  findAll: ControllerRequest = async (_req, res, next) => {
    try {
      const usuarios = await this.usuarioService.findAll()
      HandleSuccess.list(res, usuarios)
    } catch (error: unknown) {
      next(error)
    }
  }
}
