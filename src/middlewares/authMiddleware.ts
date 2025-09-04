import { NextFunction, Response } from 'express'
import { HttpStatusCode } from '../enums'
import { AuthenticatedRequest } from '../types/RequestTypes'
import { JWTUtils } from '../utils/jwtUtils'

/**
 * - Middleware de autenticação obrigatório que valida o token JWT
 * - Rejeita requisições sem token válido
 * @param {AuthenticatedRequest} req - Request com dados do usuário autenticado
 * @param {Response} res - Response do Express
 * @param {NextFunction} next - Função para continuar para o próximo middleware
 */
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: 'Token de acesso não fornecido'
      })
      return
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: 'Formato de token inválido. Use: Bearer <token>'
      })
      return
    }

    const token = authHeader.substring(7)

    if (!token) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: 'Token não fornecido'
      })
      return
    }

    const decoded = JWTUtils.verifyToken(token)
    req.user = decoded

    next()
  } catch (error) {
    if (error instanceof Error) {
      // Tratamento específico para diferentes tipos de erro JWT
      if (error.message === 'Token expirado') {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          error: 'Token expirado. Faça login novamente.',
          code: 'TOKEN_EXPIRED'
        })
        return
      }

      if (error.message === 'Token inválido') {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          error: 'Token inválido',
          code: 'TOKEN_INVALID'
        })
        return
      }

      if (error.message === 'Token ainda não é válido') {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          error: 'Token ainda não é válido',
          code: 'TOKEN_NOT_BEFORE'
        })
        return
      }
    }

    res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      error: 'Erro na autenticação',
      code: 'AUTH_ERROR'
    })
  }
}

/**
 * - Middleware de autenticação opcional que valida o token JWT quando presente
 * - Permite requisições mesmo sem token, mas autentica se fornecido
 * @param {AuthenticatedRequest} req - Request com dados do usuário autenticado (opcional)
 * @param {Response} _res - Response do Express (não utilizado)
 * @param {NextFunction} next - Função para continuar para o próximo middleware
 */
export const optionalAuthMiddleware = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next()
      return
    }

    const token = authHeader.substring(7)

    if (token) {
      try {
        const decoded = JWTUtils.verifyToken(token)
        req.user = decoded
      } catch {
        // Token inválido ou expirado, mas não é obrigatório
        // Continua sem o usuário autenticado
      }
    }

    next()
  } catch {
    // Se houver erro, continua sem autenticação
    next()
  }
}
