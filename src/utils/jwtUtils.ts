import type { TipoUsuario } from '@/enums'
import chalk from 'chalk'
import type { SignOptions, VerifyOptions } from 'jsonwebtoken'
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError
} from 'jsonwebtoken'
import { JWTSecurityConfig } from './jwtSecurityConfig'

/**
 * Estrutura do payload do JWT
 * @interface JWTPayload
 */
export interface JWTPayload {
  /** ID único do usuário */
  userId: string
  /** Email do usuário autenticado */
  email: string
  /** Tipo/perfil do usuário */
  tipo: TipoUsuario
  /** Timestamp de criação do token */
  iat?: number
  /** Timestamp de expiração do token */
  exp?: number
}

/**
 * Classe utilitária para geração e verificação de tokens JWT
 * Responsável por gerenciar toda a lógica de autenticação baseada em JWT
 */
export class JWTUtils {
  /** Chave secreta para assinatura dos tokens */
  private static readonly SECRET =
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'

  /** Tempo de expiração padrão dos tokens */
  private static readonly EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

  /** Flag indicando se o JWT foi inicializado corretamente */
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
   * Gera um token JWT assinado com os dados do usuário
   * @param {Object} payload - Dados do usuário para incluir no token
   * @param {string} payload.userId - ID único do usuário
   * @param {string} payload.email - Email do usuário
   * @param {string} payload.tipo - Tipo/perfil do usuário
   * @returns {string} Token JWT assinado
   * @throws {Error} Quando o JWT não está configurado corretamente
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
   * Verifica a validade de um token JWT e retorna o payload decodificado
   * @param {string} token - Token JWT a ser verificado
   * @returns {JWTPayload} Payload decodificado do token
   * @throws {Error} Quando o token é inválido, expirado ou malformado
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
