import chalk from 'chalk'

interface EnvVariable {
  name: string
  required: boolean
  description: string
  defaultValue?: string
  validator?: (value: string) => boolean
  validatorMessage?: string
}

interface ValidationResult {
  isValid: boolean
  missingCritical: string[]
  missingOptional: string[]
  invalidValues: Array<{ name: string; message: string }>
}

export class EnvValidator {
  private static readonly ENV_VARIABLES: EnvVariable[] = [
    // Variáveis críticas - aplicação não pode iniciar sem elas
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

    // Variáveis importantes mas com valores padrão
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
   * Determina se uma variável deve ser censurada na exibição dos logs
   *
   * @param name Nome da variável de ambiente
   * @param value Valor da variável de ambiente
   * @returns true se a variável deve ser censurada, false caso contrário
   *
   * Regras de censura:
   * - Sempre censurar variáveis que contêm 'SECRET' ou 'PASSWORD'
   * - Censurar DATABASE_URL apenas se não for SQLite (para proteger credenciais de bancos remotos)
   * - SQLite é considerado seguro pois usa arquivos locais (file: ou sqlite:)
   */
  private static shouldCensorVariable(name: string, value: string): boolean {
    // Sempre censurar variáveis que contêm SECRET ou PASSWORD
    if (name.includes('SECRET') || name.includes('PASSWORD')) {
      return true
    }

    // Censurar DATABASE_URL se não for SQLite
    if (name === 'DATABASE_URL') {
      // SQLite URLs geralmente começam com "file:" ou "sqlite:"
      const isSQLite = value.startsWith('file:') || value.startsWith('sqlite:')
      return !isSQLite
    }

    return false
  }

  /**
   * Valida todas as variáveis de ambiente
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
   * Valida e exibe resultados no console
   */
  public static validateAndLog(): boolean {
    console.log(chalk.blue.bold('\n🔍 Validando variáveis de ambiente...\n'))

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

    // Exibe variáveis opcionais ausentes
    if (result.missingOptional.length > 0) {
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

    // Exibe variáveis configuradas corretamente
    const configuredVars = this.ENV_VARIABLES.filter((envVar) => {
      const value = process.env[envVar.name]
      return (
        value &&
        value.trim() !== '' &&
        (!envVar.validator || envVar.validator(value))
      )
    })

    if (configuredVars.length > 0) {
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
      console.log(chalk.green.bold('✅ Validação concluída com sucesso!'))
      if (result.missingOptional.length > 0) {
        console.log(
          chalk.gray(
            '   (Algumas variáveis opcionais não estão configuradas, mas a aplicação pode funcionar)'
          )
        )
      }
    } else {
      console.log(chalk.red.bold('❌ VALIDAÇÃO FALHOU!'))
      console.log(
        chalk.red(
          '   Configure as variáveis críticas antes de iniciar a aplicação.'
        )
      )
      console.log()
      console.log(chalk.blue('💡 Dicas:'))
      console.log(chalk.gray('   1. Copie o arquivo .env.example para .env'))
      console.log(chalk.gray('   2. Configure as variáveis necessárias'))
      console.log(
        chalk.gray('   3. Para JWT_SECRET, execute: ') +
          chalk.cyan('pnpm generate-jwt-secret')
      )
    }

    console.log()
    return result.isValid
  }

  /**
   * Obtém informações sobre uma variável específica
   */
  public static getVariableInfo(name: string): EnvVariable | undefined {
    return this.ENV_VARIABLES.find((v) => v.name === name)
  }

  /**
   * Lista todas as variáveis de ambiente esperadas
   */
  public static listAllVariables(): EnvVariable[] {
    return [...this.ENV_VARIABLES]
  }

  /**
   * Verifica se uma variável específica está configurada corretamente
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
   * Método para usar durante o desenvolvimento - adiciona nova validação
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
}
