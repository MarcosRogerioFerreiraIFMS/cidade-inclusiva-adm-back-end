import type { IAuthService } from '@/interfaces/services'
import type { AuthenticatedRequest, ControllerRequest } from '@/types'
import { HandleSuccess } from '@/utils'

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
  me: ControllerRequest<AuthenticatedRequest> = async (req, res, next) => {
    try {
      const result = await this.authService.me(req.user)

      HandleSuccess.ok(
        res,
        result,
        'Dados do usuário autenticado retornados com sucesso'
      )
    } catch (error: unknown) {
      next(error)
    }
  }
}
