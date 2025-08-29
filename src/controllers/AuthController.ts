import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IAuthService } from '../interfaces/services/IAuthService'
import { AuditLogger } from '../utils/auditLogger'
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
