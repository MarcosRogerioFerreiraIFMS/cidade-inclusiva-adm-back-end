import chalk from 'chalk'

/**
 * Interface que define uma variável de ambiente e suas regras de validação
 */
interface EnvVariable {
  /** Nome da variável de ambiente */
  name: string
  /** Se a variável é obrigatória para funcionamento da aplicação */
  required: boolean
  /** Descrição do propósito da variável */
  description: string
  /** Valor padrão se não estiver definida */
  defaultValue?: string
  /** Função de validação personalizada */
  validator?: (value: string) => boolean
  /** Mensagem de erro quando validação falha */
  validatorMessage?: string
}

/**
 * Interface que representa o resultado da validação de variáveis de ambiente
 */
interface ValidationResult {
  /** Se todas as validações passaram */
  isValid: boolean
  /** Variáveis críticas que estão ausentes */
  missingCritical: string[]
  /** Variáveis opcionais que estão ausentes */
  missingOptional: string[]
  /** Variáveis com valores inválidos */
  invalidValues: Array<{ name: string; message: string }>
}

/**
 * Classe responsável pela validação de variáveis de ambiente
 * Garante que todas as configurações necessárias estejam presentes e válidas
 * Fornece feedback detalhado sobre problemas de configuração
 */
export class EnvValidator {
  /** Lista de todas as variáveis de ambiente configuradas para validação */
  private static readonly ENV_VARIABLES: EnvVariable[] = [
    {
      name: 'DATABASE_URL',
      required: true,
      description: 'URL de conexão com o banco de dados'
    },
    {
      name: 'JWT_SECRET',
      required: true,
      description: 'Chave secreta para geração de tokens JWT',
      validator: (value: string) => value.length >= 32,
      validatorMessage:
        'JWT_SECRET deve ter pelo menos 32 caracteres para ser seguro'
    },

    {
      name: 'JWT_EXPIRES_IN',
      required: false,
      description: 'Tempo de expiração do token JWT',
      defaultValue: '7d',
      validator: (value: string) => /^(\d+[smhd]|\d+)$/.test(value),
      validatorMessage:
        'JWT_EXPIRES_IN deve estar no formato: 30s, 15m, 1h, 7d, etc.'
    },
    {
      name: 'NODE_ENV',
      required: false,
      description: 'Ambiente de execução',
      defaultValue: 'development',
      validator: (value: string) =>
        ['development', 'production', 'test'].includes(value),
      validatorMessage: 'NODE_ENV deve ser: development, production ou test'
    },
    {
      name: 'PORT',
      required: false,
      description: 'Porta do servidor',
      defaultValue: '5555',
      validator: (value: string) => {
        const port = Number(value)
        return !isNaN(port) && port > 0 && port <= 65535
      },
      validatorMessage: 'PORT deve ser um número entre 1 e 65535'
    },

    // Variáveis opcionais
    {
      name: 'ALLOWED_ORIGINS',
      required: false,
      description: 'Origins permitidas para CORS (separadas por vírgula)',
      defaultValue: 'http://localhost:3000'
    }
  ]

  /**
   * Determina se uma variável deve ter seu valor censurado nos logs
   * @param {string} name - Nome da variável
   * @param {string} value - Valor da variável
   * @returns {boolean} True se deve ser censurada, false caso contrário
   */
  private static shouldCensorVariable(name: string, value: string): boolean {
    if (name.includes('SECRET') || name.includes('PASSWORD')) {
      return true
    }

    if (name === 'DATABASE_URL') {
      const isSQLite = value.startsWith('file:') || value.startsWith('sqlite:')
      return !isSQLite
    }

    return false
  }

  /**
   * Valida todas as variáveis de ambiente configuradas
   * @returns {ValidationResult} Resultado da validação com detalhes dos problemas encontrados
   */
  public static validate(): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      missingCritical: [],
      missingOptional: [],
      invalidValues: []
    }

    for (const envVar of this.ENV_VARIABLES) {
      const value = process.env[envVar.name]

      // Verifica se a variável está definida
      if (!value || value.trim() === '') {
        if (envVar.required) {
          result.missingCritical.push(envVar.name)
          result.isValid = false
        } else {
          result.missingOptional.push(envVar.name)
        }
        continue
      }

      // Valida o valor se houver um validador
      if (envVar.validator && !envVar.validator(value)) {
        result.invalidValues.push({
          name: envVar.name,
          message: envVar.validatorMessage || 'Valor inválido'
        })
        if (envVar.required) {
          result.isValid = false
        }
      }
    }

    return result
  }

  /**
   * Valida e exibe resultados detalhados no console
   * @param {boolean} verbose - Se deve exibir informações detalhadas
   * @returns {boolean} True se todas as validações passaram, false caso contrário
   */
  public static validateAndLog(verbose = true): boolean {
    if (verbose) {
      console.log(chalk.blue.bold('\n🔍 Validando variáveis de ambiente...\n'))
    }

    const result = this.validate()

    // Exibe variáveis críticas ausentes
    if (result.missingCritical.length > 0) {
      console.log(chalk.red.bold('❌ VARIÁVEIS CRÍTICAS AUSENTES:'))
      for (const varName of result.missingCritical) {
        const envVar = this.ENV_VARIABLES.find((v) => v.name === varName)
        console.log(
          chalk.red(`   • ${varName}: ${envVar?.description || 'Não definida'}`)
        )
      }
      console.log()
    }

    // Exibe valores inválidos
    if (result.invalidValues.length > 0) {
      console.log(chalk.red.bold('⚠️  VALORES INVÁLIDOS:'))
      for (const invalid of result.invalidValues) {
        console.log(chalk.red(`   • ${invalid.name}: ${invalid.message}`))
      }
      console.log()
    }

    // Exibe variáveis opcionais ausentes apenas em modo verboso
    if (result.missingOptional.length > 0 && verbose) {
      console.log(
        chalk.yellow.bold(
          '⚠️  VARIÁVEIS OPCIONAIS AUSENTES (usando valores padrão):'
        )
      )
      for (const varName of result.missingOptional) {
        const envVar = this.ENV_VARIABLES.find((v) => v.name === varName)
        const defaultMsg = envVar?.defaultValue
          ? ` (padrão: ${envVar.defaultValue})`
          : ''
        console.log(
          chalk.yellow(`   • ${varName}: ${envVar?.description}${defaultMsg}`)
        )
      }
      console.log()
    }

    // Exibe variáveis configuradas corretamente apenas em modo verboso
    const configuredVars = this.ENV_VARIABLES.filter((envVar) => {
      const value = process.env[envVar.name]
      return (
        value &&
        value.trim() !== '' &&
        (!envVar.validator || envVar.validator(value))
      )
    })

    if (configuredVars.length > 0 && verbose) {
      console.log(chalk.green.bold('✅ VARIÁVEIS CONFIGURADAS CORRETAMENTE:'))
      for (const envVar of configuredVars) {
        const value = process.env[envVar.name]
        const displayValue = this.shouldCensorVariable(envVar.name, value || '')
          ? '*'.repeat(8)
          : value
        console.log(chalk.green(`   • ${envVar.name}: ${displayValue}`))
      }
      console.log()
    }

    // Resultado final
    if (result.isValid) {
      if (verbose) {
        console.log(chalk.green.bold('✅ Validação concluída com sucesso!'))
        if (result.missingOptional.length > 0) {
          console.log(
            chalk.gray(
              '   (Algumas variáveis opcionais não estão configuradas, mas a aplicação pode funcionar)'
            )
          )
        }
      }
    } else {
      console.log(chalk.red.bold('❌ VALIDAÇÃO FALHOU!'))
      console.log(
        chalk.red(
          '   Configure as variáveis críticas antes de iniciar a aplicação.'
        )
      )

      // Sempre mostra a orientação principal, independente do modo verbose
      console.log()
      console.log(
        chalk.yellow.bold('💡 Para instruções completas: ') +
          chalk.cyan.bold('pnpm validate-env')
      )

      if (verbose) {
        console.log()
        console.log(chalk.blue('💡 Dicas:'))
        console.log(chalk.gray('   1. Copie o arquivo .env.example para .env'))
        console.log(chalk.gray('   2. Configure as variáveis necessárias'))
        console.log(
          chalk.gray('   3. Para JWT_SECRET, execute: ') +
            chalk.cyan('pnpm generate-jwt-secret')
        )
      }
    }

    if (verbose) {
      console.log()
    }
    return result.isValid
  }

  /**
   * Obtém informações sobre uma variável específica
   * @param {string} name - Nome da variável
   * @returns {EnvVariable | undefined} Configuração da variável ou undefined se não encontrada
   */
  public static getVariableInfo(name: string): EnvVariable | undefined {
    return this.ENV_VARIABLES.find((v) => v.name === name)
  }

  /**
   * Lista todas as variáveis configuradas para validação
   * @returns {EnvVariable[]} Cópia do array de variáveis configuradas
   */
  public static listAllVariables(): EnvVariable[] {
    return [...this.ENV_VARIABLES]
  }

  /**
   * Verifica se uma variável específica está válida
   * @param {string} name - Nome da variável a ser verificada
   * @returns {boolean} True se a variável estiver válida, false caso contrário
   */
  public static isVariableValid(name: string): boolean {
    const envVar = this.ENV_VARIABLES.find((v) => v.name === name)
    if (!envVar) return false

    const value = process.env[name]
    if (!value || value.trim() === '') {
      return !envVar.required
    }

    return !envVar.validator || envVar.validator(value)
  }

  /**
   * Adiciona ou substitui uma validação customizada para uma variável
   * @param {EnvVariable} envVar - Configuração da variável a ser adicionada
   */
  public static addCustomValidation(envVar: EnvVariable): void {
    const existingIndex = this.ENV_VARIABLES.findIndex(
      (v) => v.name === envVar.name
    )
    if (existingIndex >= 0) {
      this.ENV_VARIABLES[existingIndex] = envVar
    } else {
      this.ENV_VARIABLES.push(envVar)
    }
  }

  /**
   * Validação específica para configurações JWT com feedback detalhado
   * @returns {boolean} True se as configurações JWT estiverem válidas, false caso contrário
   */
  public static validateJWTAndLog(): boolean {
    console.log(chalk.blue.bold('\n🔐 Verificação específica do JWT...\n'))

    const jwtSecret = process.env.JWT_SECRET
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d'
    let isValid = true

    if (!jwtSecret) {
      console.log(chalk.red.bold('❌ JWT_SECRET ausente:'))
      console.log(
        chalk.red('   • Variável obrigatória para autenticação não encontrada')
      )
      console.log(
        chalk.red('   • Aplicação não pode processar login/logout sem ela')
      )
      console.log()
      console.log(chalk.blue('🛠️  Solução passo a passo:'))
      console.log(
        chalk.gray('   1. Execute: ') + chalk.cyan('pnpm generate-jwt-secret')
      )
      console.log(
        chalk.gray(
          '   2. Copie uma das chaves geradas (recomendado: Hexadecimal 64 bytes)'
        )
      )
      console.log(chalk.gray('   3. Abra o arquivo .env'))
      console.log(
        chalk.gray('   4. Adicione a linha: ') +
          chalk.cyan('JWT_SECRET=sua-chave-copiada')
      )
      console.log(chalk.gray('   5. Salve o arquivo'))
      console.log(
        chalk.gray('   6. Execute novamente: ') + chalk.cyan('pnpm dev')
      )
      console.log()
      isValid = false
    } else {
      const jwtVar = this.ENV_VARIABLES.find((v) => v.name === 'JWT_SECRET')
      if (jwtVar?.validator && !jwtVar.validator(jwtSecret)) {
        console.log(chalk.yellow.bold('⚠️  JWT_SECRET inseguro:'))
        console.log(chalk.yellow(`   • Atual: ${jwtSecret.length} caracteres`))
        console.log(chalk.yellow('   • Mínimo recomendado: 32 caracteres'))
        console.log(chalk.yellow('   • Produção: 64+ caracteres'))
        console.log()
        console.log(chalk.blue('🔧 Para melhorar a segurança:'))
        console.log(
          chalk.gray('   1. Execute: ') + chalk.cyan('pnpm generate-jwt-secret')
        )
        console.log(
          chalk.gray(
            '   2. Substitua o JWT_SECRET atual por uma chave mais longa'
          )
        )
        console.log()
        isValid = false
      } else {
        console.log(chalk.green('✅ JWT_SECRET configurado adequadamente'))
        console.log(
          chalk.gray(`   • Comprimento: ${jwtSecret.length} caracteres`)
        )
      }
    }

    const expiresInVar = this.ENV_VARIABLES.find(
      (v) => v.name === 'JWT_EXPIRES_IN'
    )
    if (expiresInVar?.validator && !expiresInVar.validator(jwtExpiresIn)) {
      console.log(chalk.yellow.bold('⚠️  JWT_EXPIRES_IN com formato inválido:'))
      console.log(chalk.yellow(`   • Valor atual: "${jwtExpiresIn}"`))
      console.log()
      console.log(chalk.blue('📝 Exemplos de formatos válidos:'))
      console.log(
        chalk.gray('   • ') + chalk.cyan('30s') + chalk.gray(' → 30 segundos')
      )
      console.log(
        chalk.gray('   • ') + chalk.cyan('15m') + chalk.gray(' → 15 minutos')
      )
      console.log(
        chalk.gray('   • ') + chalk.cyan('2h') + chalk.gray(' → 2 horas')
      )
      console.log(
        chalk.gray('   • ') +
          chalk.cyan('7d') +
          chalk.gray(' → 7 dias (recomendado)')
      )
      console.log(
        chalk.gray('   • ') + chalk.cyan('30d') + chalk.gray(' → 30 dias')
      )
      console.log()
      isValid = false
    } else {
      console.log(chalk.green('✅ JWT_EXPIRES_IN configurado corretamente'))
      console.log(chalk.gray(`   • Duração: ${jwtExpiresIn}`))
    }

    if (!isValid) {
      console.log(
        chalk.red.bold('\n❌ Configuração JWT precisa ser corrigida!')
      )
      console.log(
        chalk.red('   Sistema de autenticação não funcionará adequadamente.')
      )
      console.log()
      console.log(chalk.blue('🎯 Ação recomendada:'))
      console.log(
        chalk.gray('   Execute: ') +
          chalk.cyan('pnpm generate-jwt-secret') +
          chalk.gray(' e siga as instruções')
      )
    } else {
      console.log(chalk.green.bold('\n✅ Configuração JWT está correta!'))
      console.log(chalk.gray('   Sistema de autenticação pronto para uso.'))
    }

    console.log()
    return isValid
  }
}
