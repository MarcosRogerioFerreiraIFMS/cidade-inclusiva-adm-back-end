import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IAuthService } from '../interfaces/services/IAuthService'
import { ControllerRequest } from '../types/RequestTypes'
import { AuditLogger } from '../utils/auditLogger'
import { HandleSuccess } from '../utils/HandleSuccess'

/**
 * Controller responsável pelas operações de autenticação
 */
export class AuthController {
  /**
   * @param {IAuthService} authService - Serviço de autenticação injetado
   */
  constructor(private authService: IAuthService) {}

  /**
   * Realiza o login do usuário com email e senha
   * @type {ControllerRequest}
   */
  login: ControllerRequest = async (req, res, next) => {
    try {
      const login = await this.authService.login(req.body)

      // Log de login bem-sucedido
      await AuditLogger.logLogin(req, login.usuario.id)

      HandleSuccess.ok(res, login, 'Login realizado com sucesso')
    } catch (error: unknown) {
      // Log de tentativa de login falhada
      if (req.body?.email) {
        await AuditLogger.logFailedLogin(req, req.body.email)
      }

      next(error)
    }
  }

  /**
   * Valida se um token JWT está válido e retorna os dados do usuário
   * @type {ControllerRequest}
   */
  validateToken: ControllerRequest = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          error: 'Token não fornecido ou formato inválido'
        })
        return
      }

      const token = authHeader.substring(7)
      const result = await this.authService.validateToken(token)

      HandleSuccess.ok(res, result, 'Token válido')
    } catch (error: unknown) {
      next(error)
    }
  }
}
