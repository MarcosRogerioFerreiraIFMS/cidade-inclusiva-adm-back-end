import { UsuarioDependencies } from '@/dependencies/UsuarioDependencies'
import { HttpStatusCode } from '@/enums'
import type { AuthenticatedRequest } from '@/types'
import { JWTUtils } from '@/utils'
import type { NextFunction, Response } from 'express'

/**
 * - Middleware de autenticação obrigatório que valida o token JWT
 * - Rejeita requisições sem token válido
 * - Verifica se o userId do token existe no banco de dados
 * @param {AuthenticatedRequest} req - Request com dados do usuário autenticado
 * @param {Response} res - Response do Express
 * @param {NextFunction} next - Função para continuar para o próximo middleware
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    // Extrai o token do cabeçalho de autorização
    const token = authHeader.substring(7) // Remove "Bearer " do início

    if (!token) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: 'Token não fornecido'
      })
      return
    }

    const decoded = JWTUtils.verifyToken(token)

    // Verifica se o usuário ainda existe no banco de dados e obtém dados atualizados
    const user = await UsuarioDependencies.dao.findById(decoded.userId)

    if (!user) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: 'Token inválido: usuário não encontrado',
        code: 'USER_NOT_FOUND'
      })
      return
    }

    // Define req.user com os dados atualizados do banco em vez dos dados do token
    req.user = user

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
 * - Verifica se o userId do token existe no banco de dados quando token for válido
 * - Pode ser usado para mudar comportamento de rotas públicas quando usuário está logado
 * @param {AuthenticatedRequest} req - Request com dados do usuário autenticado (opcional)
 * @param {Response} _res - Response do Express (não utilizado)
 * @param {NextFunction} next - Função para continuar para o próximo middleware
 */
export const optionalAuthMiddleware = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
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

        // Verifica se o usuário ainda existe no banco de dados e obtém dados atualizados
        const user = await UsuarioDependencies.dao.findById(decoded.userId)

        // Se o usuário existe, define req.user com os dados atualizados do banco
        if (user) {
          req.user = user
        }
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
