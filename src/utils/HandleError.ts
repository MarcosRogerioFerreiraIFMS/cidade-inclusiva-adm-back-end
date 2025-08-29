import chalk from 'chalk'
import { Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from './HttpError'

interface ErrorResponse {
  success: false
  error: string
  details?: string | Record<string, unknown> | Array<Record<string, unknown>>
}

interface PrismaError extends Error {
  code?: string
  meta?: {
    target?: string[]
    cause?: string
    field_name?: string
  }
}

interface ZodError extends Error {
  name: 'ZodError'
  errors: Array<{
    path: string[]
    message: string
    code: string
    received?: unknown
  }>
}

interface JsonSyntaxError extends SyntaxError {
  status?: number
  statusCode?: number
  type?: string
  body?: string
}

export class HandleError {
  public static handleError(
    res: Response,
    err: HttpError | unknown
  ): Response<ErrorResponse> {
    if (!err) {
      console.error(
        chalk.red.bold('❌ ERRO INESPERADO:'),
        chalk.gray('Nenhum erro fornecido')
      )
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Erro interno do servidor'
      })
    }

    if (this.isJsonSyntaxError(err)) {
      return this.handleJsonSyntaxError(res, err)
    }

    if (this.isZodError(err)) {
      return this.handleZodError(res, err)
    }

    if (this.isPrismaError(err)) {
      return this.handlePrismaError(res, err)
    }

    if (err instanceof HttpError) {
      return this.handleHttpError(res, err)
    }

    return this.handleGenericError(res, err)
  }

  private static isZodError(err: unknown): err is ZodError {
    return err instanceof Error && err.name === 'ZodError' && 'errors' in err
  }

  private static isJsonSyntaxError(err: unknown): err is JsonSyntaxError {
    return (
      err instanceof SyntaxError &&
      (err.message.includes('JSON') ||
        err.message.includes('Unexpected token') ||
        (err as JsonSyntaxError).type === 'entity.parse.failed' ||
        (err as JsonSyntaxError).status === 400)
    )
  }

  private static isPrismaError(err: unknown): err is PrismaError {
    return (
      err instanceof Error &&
      'code' in err &&
      typeof (err as PrismaError).code === 'string'
    )
  }

  private static handleZodError(
    res: Response,
    zodErr: ZodError
  ): Response<ErrorResponse> {
    const errors = zodErr.errors.map((e) => {
      if (e.code === 'invalid_enum_value') {
        return {
          path: e.path.join('.'),
          message: `Valor inválido para ${e.path.join(
            '.'
          )}. Valores aceitos: ${this.getEnumValues(e.path[0])}`,
          receivedValue: e.received
        }
      }

      return {
        path: e.path.join('.'),
        message: e.message,
        receivedValue: e.received
      }
    })

    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: 'Erro de validação',
      details: errors
    })
  }

  private static handleJsonSyntaxError(
    res: Response,
    jsonErr: JsonSyntaxError
  ): Response<ErrorResponse> {
    console.error(
      chalk.red.bold('📄 JSON SYNTAX ERROR:'),
      chalk.yellow(jsonErr.message)
    )

    let errorDetails = 'O JSON enviado está malformado'

    if (jsonErr.message.includes('position')) {
      const match = jsonErr.message.match(/position (\d+)/)
      if (match) {
        errorDetails += ` na posição ${match[1]}`
      }
    } else if (jsonErr.message.includes('Unexpected token')) {
      const match = jsonErr.message.match(/Unexpected token (.+) in JSON/)
      if (match) {
        errorDetails += `. Token inesperado: ${match[1]}`
      }
    }

    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: 'JSON inválido',
      details: errorDetails,
      message: 'Verifique a sintaxe do JSON enviado'
    })
  }

  private static handlePrismaError(
    res: Response,
    prismaErr: PrismaError
  ): Response<ErrorResponse> {
    switch (prismaErr.code) {
      case 'P2002':
        console.error(
          chalk.red.bold('🔁 DUPLICAÇÃO:'),
          chalk.cyan('P2002'),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Recurso já existe',
          details: 'Já existe um registro com esses dados únicos'
        })

      case 'P2025':
        console.error(
          chalk.red.bold('🔍 NÃO ENCONTRADO:'),
          chalk.cyan('P2025'),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          error: 'Registro não encontrado',
          details: 'O registro solicitado não foi encontrado no banco de dados'
        })

      case 'P2003':
        console.error(
          chalk.red.bold('🔗 CONSTRAINT:'),
          chalk.cyan('P2003'),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Erro de relacionamento',
          details: 'Violação de constraint de chave estrangeira'
        })

      case 'P2021':
        console.error(
          chalk.red.bold('🗄️  TABELA:'),
          chalk.cyan('P2021'),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: 'Erro interno do servidor',
          details: 'Estrutura do banco de dados inválida'
        })

      case 'P2000':
        console.error(
          chalk.red.bold('📏 TAMANHO:'),
          chalk.cyan('P2000'),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Dados inválidos',
          details: 'Um ou mais campos excedem o tamanho máximo permitido'
        })

      case 'P2006':
        console.error(
          chalk.red.bold('❌ VALOR INVÁLIDO:'),
          chalk.cyan('P2006'),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Dados inválidos',
          details: 'Valor fornecido é inválido para o campo especificado'
        })

      default:
        console.error(
          chalk.red.bold('🗃️  PRISMA ERROR:'),
          chalk.cyan(prismaErr.code),
          chalk.yellow(prismaErr.message)
        )
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: 'Erro interno do servidor',
          details: 'Erro na operação do banco de dados'
        })
    }
  }

  private static handleHttpError(
    res: Response,
    httpErr: HttpError
  ): Response<ErrorResponse> {
    const isClientError = httpErr.statusCode >= 400 && httpErr.statusCode < 500

    if (isClientError) {
      console.error(
        chalk.yellow.bold('⚠️  ERRO DO CLIENTE:'),
        chalk.red(httpErr.message),
        chalk.gray('Status:'),
        chalk.magenta(httpErr.statusCode.toString())
      )
    } else {
      console.error(
        chalk.red.bold('💥 ERRO DO SERVIDOR:'),
        chalk.red(httpErr.message),
        chalk.gray('Status:'),
        chalk.magenta(httpErr.statusCode.toString())
      )
    }

    const statusCode = httpErr.statusCode || HttpStatusCode.BAD_REQUEST
    const message = httpErr.message || 'Erro inesperado'

    return res.status(statusCode).json({
      success: false,
      error: message
    })
  }

  private static handleGenericError(
    res: Response,
    err: unknown
  ): Response<ErrorResponse> {
    console.error(chalk.red.bold('🚨 ERRO GENÉRICO:'), chalk.gray(String(err)))
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }

  private static getEnumValues(fieldName: string): string {
    if (fieldName === 'categoria') {
      return 'DIREITOS, BENEFICIOS, OPORTUNIDADES, TECNOLOGIA, TRABALHO, SAUDE, EDUCACAO, CULTURA, EVENTOS, ESPORTE, ACESSIBILIDADE, OUTROS'
    }
    return 'valores válidos'
  }
}
