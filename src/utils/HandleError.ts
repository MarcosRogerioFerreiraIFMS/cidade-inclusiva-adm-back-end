import chalk from 'chalk'
import { Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from './HttpError'

/**
 * Interface que define a estrutura de resposta para erros da API
 */
interface ErrorResponse {
  /** Sempre false para indicar falha na operação */
  success: false
  /** Mensagem de erro principal */
  error: string
  /** Detalhes adicionais sobre o erro (opcional) */
  details?: string | Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * Interface para erros específicos do Prisma ORM
 * Estende Error com propriedades específicas do Prisma
 */
interface PrismaError extends Error {
  /** Código de erro do Prisma (ex: P2002, P2025) */
  code?: string
  /** Metadados adicionais sobre o erro */
  meta?: {
    /** Campos que causaram o erro */
    target?: string[]
    /** Causa raiz do erro */
    cause?: string
    /** Nome do campo específico */
    field_name?: string
  }
}

/**
 * Interface para erros de validação do Zod
 * Contém informações detalhadas sobre falhas de validação
 */
interface ZodError extends Error {
  /** Nome identificador do erro Zod */
  name: 'ZodError'
  /** Array de erros específicos de validação */
  errors: Array<{
    /** Caminho do campo que falhou */
    path: string[]
    /** Mensagem de erro */
    message: string
    /** Código do tipo de erro */
    code: string
    /** Valor recebido que causou o erro */
    received?: unknown
  }>
}

/**
 * Interface para erros de sintaxe JSON
 * Estende SyntaxError com propriedades específicas de parsing JSON
 */
interface JsonSyntaxError extends SyntaxError {
  /** Status HTTP associado ao erro */
  status?: number
  /** Código de status HTTP */
  statusCode?: number
  /** Tipo do erro de parsing */
  type?: string
  /** Corpo da requisição que causou o erro */
  body?: string
}

/**
 * Classe utilitária para tratamento centralizado de erros da aplicação
 * Fornece métodos especializados para diferentes tipos de erro
 * Inclui logging colorido e respostas padronizadas
 */
export class HandleError {
  /**
   * Método principal para tratamento de erros da aplicação
   * Identifica o tipo de erro e delega para o handler específico
   * @param {Response} res - Objeto Response do Express
   * @param {HttpError | unknown} err - Erro a ser tratado
   * @returns {Response<ErrorResponse>} Resposta HTTP formatada com detalhes do erro
   */
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

  /**
   * Verifica se o erro é um erro de validação Zod
   * @param {unknown} err - Erro a ser verificado
   * @returns {boolean} True se for erro Zod, false caso contrário
   */
  private static isZodError(err: unknown): err is ZodError {
    return err instanceof Error && err.name === 'ZodError' && 'errors' in err
  }

  /**
   * Verifica se o erro é um erro de sintaxe JSON
   * @param {unknown} err - Erro a ser verificado
   * @returns {boolean} True se for erro de JSON, false caso contrário
   */
  private static isJsonSyntaxError(err: unknown): err is JsonSyntaxError {
    return (
      err instanceof SyntaxError &&
      (err.message.includes('JSON') ||
        err.message.includes('Unexpected token') ||
        (err as JsonSyntaxError).type === 'entity.parse.failed' ||
        (err as JsonSyntaxError).status === 400)
    )
  }

  /**
   * Verifica se o erro é um erro específico do Prisma ORM
   * @param {unknown} err - Erro a ser verificado
   * @returns {boolean} True se for erro Prisma, false caso contrário
   */
  private static isPrismaError(err: unknown): err is PrismaError {
    return (
      err instanceof Error &&
      'code' in err &&
      typeof (err as PrismaError).code === 'string'
    )
  }

  /**
   * Trata erros de validação Zod convertendo-os em respostas HTTP amigáveis
   * @param {Response} res - Objeto Response do Express
   * @param {ZodError} zodErr - Erro de validação Zod
   * @returns {Response<ErrorResponse>} Resposta HTTP com detalhes dos erros de validação
   */
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

  /**
   * Trata erros de sintaxe JSON fornecendo feedback específico sobre o problema
   * @param {Response} res - Objeto Response do Express
   * @param {JsonSyntaxError} jsonErr - Erro de sintaxe JSON
   * @returns {Response<ErrorResponse>} Resposta HTTP com detalhes do erro JSON
   */
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

  /**
   * Trata erros específicos do Prisma ORM baseado nos códigos de erro
   * Converte códigos Prisma em mensagens de erro compreensíveis
   * @param {Response} res - Objeto Response do Express
   * @param {PrismaError} prismaErr - Erro do Prisma ORM
   * @returns {Response<ErrorResponse>} Resposta HTTP com tratamento específico do erro Prisma
   */
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

  /**
   * Trata erros HTTP customizados da aplicação
   * @param {Response} res - Objeto Response do Express
   * @param {HttpError} httpErr - Erro HTTP customizado
   * @returns {Response<ErrorResponse>} Resposta HTTP com status e mensagem apropriados
   */
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

  /**
   * Trata erros genéricos não identificados pelos outros handlers
   * @param {Response} res - Objeto Response do Express
   * @param {unknown} err - Erro genérico não categorizado
   * @returns {Response<ErrorResponse>} Resposta HTTP genérica para erro interno
   */
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

  /**
   * Obtém valores válidos para campos enum baseado no nome do campo
   * @param {string} fieldName - Nome do campo enum
   * @returns {string} String com valores válidos separados por vírgula
   */
  private static getEnumValues(fieldName: string): string {
    if (fieldName === 'categoria') {
      return 'DIREITOS, BENEFICIOS, OPORTUNIDADES, TECNOLOGIA, TRABALHO, SAUDE, EDUCACAO, CULTURA, EVENTOS, ESPORTE, ACESSIBILIDADE, OUTROS'
    }
    return 'valores válidos'
  }
}
