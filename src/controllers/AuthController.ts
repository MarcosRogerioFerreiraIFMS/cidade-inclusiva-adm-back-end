import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IAuthService } from '../interfaces/services/IAuthService'
import { HandleSuccess } from '../utils/HandleSuccess'

export class AuthController {
  constructor(private authService: IAuthService) {}

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const login = await this.authService.login(req.body)
      HandleSuccess.ok(res, login, 'Login realizado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
