import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  SignOptions,
  TokenExpiredError,
  VerifyOptions
} from 'jsonwebtoken'
import { JWTSecurityConfig } from './jwtSecurityConfig'

/**
 * Estrutura do payload do JWT.
 */
export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

/**
 * Utilitários para geração e verificação de tokens JWT.
 */
export class JWTUtils {
  private static readonly SECRET =
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'

  private static readonly EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

  private static readonly isInitialized = JWTSecurityConfig.initialize()

  static {
    if (!this.isInitialized) {
      console.warn('⚠️  JWT não foi inicializado corretamente.')
    }
  }

  /**
   * Gera um token JWT.
   */
  static generateToken(payload: { userId: string; email: string }): string {
    if (!this.isInitialized) {
      throw new Error('JWT não foi inicializado corretamente.')
    }

    return jwt.sign(payload, this.SECRET, {
      expiresIn: this.EXPIRES_IN as SignOptions['expiresIn']
    })
  }

  /**
   * Verifica a validade de um token JWT.
   */
  static verifyToken(token: string): JWTPayload {
    if (!this.isInitialized) {
      throw new Error('JWT não foi inicializado corretamente.')
    }

    try {
      const verifyOptions: VerifyOptions = {
        algorithms: JWTSecurityConfig.ALLOWED_ALGORITHMS,
        clockTolerance: JWTSecurityConfig.getSecurityConfig().clockTolerance
      }

      const payload = jwt.verify(token, this.SECRET, verifyOptions)

      if (!payload || typeof payload !== 'object') {
        throw new Error('Payload do token inválido')
      }

      if (!('userId' in payload) || !('email' in payload)) {
        throw new Error('Payload incompleto no token')
      }

      return payload as JWTPayload
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[JWT ERROR]', error)
      }

      if (error instanceof TokenExpiredError) {
        throw new Error('Token expirado')
      }
      if (error instanceof JsonWebTokenError) {
        throw new Error('Token inválido')
      }
      if (error instanceof NotBeforeError) {
        throw new Error('Token ainda não é válido')
      }

      throw new Error('Erro ao verificar o token')
    }
  }
}
