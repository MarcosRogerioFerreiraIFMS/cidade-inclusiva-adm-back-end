import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IAuthService } from '../interfaces/services/IAuthService'
import { ControllerRequest } from '../types/RequestTypes'
import { HandleSuccess } from '../utils/HandleSuccess'

/**
 * Controller responsável pelas operações de autenticação
 */
export class AuthController {
  constructor(private authService: IAuthService) {}

  /**
   * Realiza o login do usuário com email e senha
   * @type {ControllerRequest}
   */
  login: ControllerRequest = async (req, res, next) => {
    try {
      const login = await this.authService.login(req.body)

      HandleSuccess.ok(res, login, 'Login realizado com sucesso')
    } catch (error: unknown) {
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
