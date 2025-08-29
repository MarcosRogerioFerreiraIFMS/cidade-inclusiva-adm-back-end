import chalk from 'chalk'
import jwt from 'jsonwebtoken'

/**
 * Configurações e validações relacionadas à segurança do JWT.
 */
export class JWTSecurityConfig {
  /** Algoritmos permitidos para assinatura/verificação JWT */
  static readonly ALLOWED_ALGORITHMS: jwt.Algorithm[] = ['HS256']

  private static readonly LOG_PREFIX = '[JWT Security]'

  /**
   * Retorna configurações de segurança ajustadas conforme ambiente.
   */
  static getSecurityConfig() {
    const isProduction = process.env.NODE_ENV === 'production'
    return {
      minSecretLength: isProduction ? 64 : 32,
      clockTolerance: 30
    }
  }

  /**
   * Valida se o segredo JWT é seguro.
   */
  private static validateSecret(secret: string): boolean {
    if (!secret) return false

    const minLength = this.getSecurityConfig().minSecretLength
    if (secret.length < minLength) return false

    const insecureSecrets = [
      'your-secret-key-change-in-production',
      'secret',
      'password',
      '123456',
      'default'
    ]

    return !insecureSecrets.includes(secret.toLowerCase())
  }

  /**
   * Valida o formato da duração do token JWT.
   */
  private static validateTokenDuration(duration: string): boolean {
    return /^(\d+)([smhd])$/.test(duration)
  }

  /**
   * Inicializa e valida as configurações JWT.
   * Exibe apenas warnings para problemas de segurança.
   */
  static initialize(): boolean {
    const secret = process.env.JWT_SECRET || ''
    const expiresIn = process.env.JWT_EXPIRES_IN || ''
    let hasErrors = false

    if (!secret) {
      console.warn(
        chalk.yellow(`${this.LOG_PREFIX} ⚠️  JWT_SECRET não está definido`)
      )
      hasErrors = true
    } else if (!this.validateSecret(secret)) {
      console.warn(
        chalk.yellow(
          `${this.LOG_PREFIX} ⚠️  JWT_SECRET não atende aos requisitos de segurança`
        )
      )
      hasErrors = true
    }

    if (expiresIn && !this.validateTokenDuration(expiresIn)) {
      console.warn(
        chalk.yellow(
          `${this.LOG_PREFIX} ⚠️  JWT_EXPIRES_IN tem formato inválido: "${expiresIn}"`
        )
      )
      hasErrors = true
    }

    return !hasErrors
  }
}
