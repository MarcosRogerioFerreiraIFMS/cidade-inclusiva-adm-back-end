import { TipoUsuario } from '@prisma/client'
import chalk from 'chalk'
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
  tipo: TipoUsuario
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

  private static readonly isInitialized = JWTSecurityConfig.initialize(false)

  static {
    // JWT será validado apenas quando necessário, sem logs desnecessários durante desenvolvimento
    if (!this.isInitialized && process.env.NODE_ENV === 'production') {
      console.error(chalk.red.bold('\n💥 FALHA NA INICIALIZAÇÃO JWT!'))
      console.error(
        chalk.red('   Não é possível usar funcionalidades de autenticação.')
      )
      console.error()
      console.error(chalk.blue('📋 Para corrigir:'))
      console.error(
        chalk.gray('   1. Verifique as configurações: ') +
          chalk.cyan('pnpm validate-env')
      )
      console.error(
        chalk.gray('   2. Gere uma chave segura: ') +
          chalk.cyan('pnpm generate-jwt-secret')
      )
      console.error(chalk.gray('   3. Configure o JWT_SECRET no arquivo .env'))
      console.error()
    }
  }

  /**
   * Gera um token JWT.
   */
  static generateToken(payload: {
    userId: string
    email: string
    tipo: string
  }): string {
    if (!this.isInitialized) {
      console.error(
        chalk.red.bold(
          '[JWT ERROR] Tentativa de gerar token com JWT não inicializado'
        )
      )
      console.error(
        chalk.red(
          'Verifique as configurações JWT antes de usar a autenticação.'
        )
      )
      console.error(chalk.gray('Execute: ') + chalk.cyan('pnpm validate-env'))
      throw new Error(
        'JWT não foi inicializado corretamente. Configure JWT_SECRET no .env.'
      )
    }

    try {
      const token = jwt.sign(payload, this.SECRET, {
        expiresIn: this.EXPIRES_IN as SignOptions['expiresIn']
      })

      if (process.env.NODE_ENV !== 'production') {
        console.log(
          chalk.green(
            `[JWT] Token gerado com sucesso para usuário: ${payload.email}`
          )
        )
      }

      return token
    } catch (error) {
      console.error(chalk.red.bold('[JWT ERROR] Falha ao gerar token'))
      console.error(chalk.red('Verifique se JWT_SECRET é válido.'))
      console.error(chalk.gray('Erro detalhado:'), error)
      throw new Error('Erro interno ao gerar token de autenticação.')
    }
  }

  /**
   * Verifica a validade de um token JWT.
   */
  static verifyToken(token: string): JWTPayload {
    if (!this.isInitialized) {
      console.error(
        chalk.red.bold(
          '[JWT ERROR] Tentativa de verificar token com JWT não inicializado'
        )
      )
      console.error(
        chalk.red(
          'Verifique as configurações JWT antes de usar a autenticação.'
        )
      )
      console.error(chalk.gray('Execute: ') + chalk.cyan('pnpm validate-env'))
      throw new Error(
        'JWT não foi inicializado corretamente. Configure JWT_SECRET no .env.'
      )
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
        console.error(chalk.red('[JWT ERROR] Falha na verificação do token'))
      }

      if (error instanceof TokenExpiredError) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            chalk.yellow(
              '[JWT] Token expirado - usuário precisa fazer login novamente'
            )
          )
        }
        throw new Error('Token expirado')
      }

      if (error instanceof JsonWebTokenError) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            chalk.red('[JWT] Token malformado ou assinatura inválida')
          )
        }
        throw new Error('Token inválido')
      }

      if (error instanceof NotBeforeError) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            chalk.yellow('[JWT] Token usado antes do tempo permitido')
          )
        }
        throw new Error('Token ainda não é válido')
      }

      if (process.env.NODE_ENV !== 'production') {
        console.error(
          chalk.red('[JWT] Erro desconhecido na verificação:'),
          error
        )
      }
      throw new Error('Erro ao verificar o token')
    }
  }
}
