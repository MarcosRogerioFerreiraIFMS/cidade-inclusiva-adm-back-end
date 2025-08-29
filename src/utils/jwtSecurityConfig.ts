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
   * Exibe logs detalhados com instruções para correção.
   */
  static initialize(verbose = false): boolean {
    const secret = process.env.JWT_SECRET || ''
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
    const isProduction = process.env.NODE_ENV === 'production'
    let hasErrors = false

    if (verbose) {
      console.log(
        chalk.blue.bold(
          `\n${this.LOG_PREFIX} 🔐 Verificando configurações JWT...\n`
        )
      )
    }

    // Validação do JWT_SECRET
    if (!secret) {
      if (verbose) {
        console.log(chalk.red.bold('❌ JWT_SECRET NÃO ENCONTRADO:'))
        console.log(
          chalk.red(
            '   • A variável JWT_SECRET é obrigatória para autenticação'
          )
        )
        console.log(
          chalk.red(
            '   • Sem ela, não é possível gerar ou verificar tokens JWT'
          )
        )
        console.log()
        console.log(chalk.blue('💡 Para corrigir:'))
        console.log(
          chalk.gray('   1. Execute: ') + chalk.cyan('pnpm generate-jwt-secret')
        )
        console.log(chalk.gray('   2. Copie uma das chaves geradas'))
        console.log(
          chalk.gray('   3. Adicione ao .env: ') +
            chalk.cyan('JWT_SECRET=sua-chave-aqui')
        )
        console.log()
      }
      hasErrors = true
    } else if (!this.validateSecret(secret)) {
      const minLength = this.getSecurityConfig().minSecretLength
      if (verbose) {
        console.log(chalk.red.bold('⚠️  JWT_SECRET INSEGURO:'))
        console.log(
          chalk.red(`   • Deve ter pelo menos ${minLength} caracteres`)
        )
        console.log(chalk.red('   • Não pode usar valores padrão ou óbvios'))
        console.log(chalk.red(`   • Atual: ${secret.length} caracteres`))
        console.log()
        console.log(chalk.blue('💡 Para corrigir:'))
        console.log(
          chalk.gray('   1. Execute: ') + chalk.cyan('pnpm generate-jwt-secret')
        )
        console.log(chalk.gray('   2. Substitua o JWT_SECRET atual no .env'))
        console.log()
      }
      hasErrors = true
    } else if (verbose) {
      console.log(chalk.green('✅ JWT_SECRET configurado corretamente'))
      console.log(chalk.gray(`   • Comprimento: ${secret.length} caracteres`))
      console.log(
        chalk.gray(
          `   • Ambiente: ${isProduction ? 'produção' : 'desenvolvimento'}`
        )
      )
    }

    // Validação do JWT_EXPIRES_IN
    if (!this.validateTokenDuration(expiresIn)) {
      if (verbose) {
        console.log(chalk.red.bold('⚠️  JWT_EXPIRES_IN FORMATO INVÁLIDO:'))
        console.log(chalk.red(`   • Valor atual: "${expiresIn}"`))
        console.log(
          chalk.red('   • Deve seguir o formato: número + unidade (s/m/h/d)')
        )
        console.log()
        console.log(chalk.blue('💡 Exemplos válidos:'))
        console.log(
          chalk.gray('   • ') + chalk.cyan('30s') + chalk.gray(' (30 segundos)')
        )
        console.log(
          chalk.gray('   • ') + chalk.cyan('15m') + chalk.gray(' (15 minutos)')
        )
        console.log(
          chalk.gray('   • ') + chalk.cyan('1h') + chalk.gray(' (1 hora)')
        )
        console.log(
          chalk.gray('   • ') +
            chalk.cyan('7d') +
            chalk.gray(' (7 dias - padrão)')
        )
        console.log()
      }
      hasErrors = true
    } else if (verbose) {
      console.log(chalk.green('✅ JWT_EXPIRES_IN configurado corretamente'))
      console.log(chalk.gray(`   • Duração: ${expiresIn}`))
    }

    // Informações de segurança adicionais
    if (verbose) {
      console.log(chalk.blue('🔒 Configurações de segurança:'))
      console.log(
        chalk.gray(
          `   • Algoritmos permitidos: ${this.ALLOWED_ALGORITHMS.join(', ')}`
        )
      )
      console.log(
        chalk.gray(
          `   • Tolerância de relógio: ${
            this.getSecurityConfig().clockTolerance
          }s`
        )
      )
      console.log(
        chalk.gray(
          `   • Comprimento mínimo secret: ${
            this.getSecurityConfig().minSecretLength
          } chars`
        )
      )
    }

    if (hasErrors && verbose) {
      console.log(chalk.red.bold('\n❌ CONFIGURAÇÃO JWT FALHOU!'))
      console.log(
        chalk.red(
          '   A aplicação não pode ser iniciada com configurações JWT inválidas.'
        )
      )
      console.log()
      console.log(chalk.blue('📋 Checklist para correção:'))
      console.log(
        chalk.gray('   ☐ Executar: ') + chalk.cyan('pnpm generate-jwt-secret')
      )
      console.log(
        chalk.gray('   ☐ Copiar chave segura para JWT_SECRET no .env')
      )
      console.log(
        chalk.gray('   ☐ Verificar formato do JWT_EXPIRES_IN (ex: 7d)')
      )
      console.log(
        chalk.gray('   ☐ Executar: ') + chalk.cyan('pnpm validate-env')
      )
    } else if (!hasErrors && verbose) {
      console.log(chalk.green.bold('\n✅ Configuração JWT válida!'))
      console.log(chalk.gray('   Autenticação JWT pronta para uso.'))
    }

    if (verbose) {
      console.log()
    }
    return !hasErrors
  }
}
