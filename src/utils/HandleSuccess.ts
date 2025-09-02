import { Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'

/**
 * Interface para respostas de sucesso padronizadas
 * @template T - Tipo dos dados retornados
 */
interface SuccessResponse<T = unknown> {
  /** Indica que a operação foi bem-sucedida */
  success: true
  /** Dados retornados pela operação */
  data?: T
  /** Mensagem descritiva da operação */
  message?: string
  /** Total de itens (para listas) */
  total?: number
  /** Página atual (para paginação) */
  page?: number
  /** Limite de itens por página */
  limit?: number
  /** Total de páginas */
  totalPages?: number
}

/**
 * Opções para paginação de resultados
 */
interface PaginationOptions {
  /** Página atual */
  page: number
  /** Limite de itens por página */
  limit: number
  /** Total de itens disponíveis */
  total: number
}

/**
 * Classe utilitária para padronizar respostas de sucesso da API
 * Fornece métodos estáticos para diferentes tipos de operações bem-sucedidas
 */
export class HandleSuccess {
  /**
   * Resposta para recursos criados com sucesso
   * @template T
   * @param {Response} res - Response do Express
   * @param {T} data - Dados do recurso criado
   * @param {string} message - Mensagem personalizada
   * @returns {Response<SuccessResponse<T>>} Response com status 201
   */
  public static created<T>(
    res: Response,
    data: T,
    message = 'Recurso criado com sucesso'
  ): Response<SuccessResponse<T>> {
    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      data,
      message
    })
  }

  /**
   * Resposta genérica de sucesso
   * @template T
   * @param {Response} res - Response do Express
   * @param {T} data - Dados da operação (opcional)
   * @param {string} message - Mensagem personalizada (opcional)
   * @returns {Response<SuccessResponse<T>>} Response com status 200
   */
  public static ok<T>(
    res: Response,
    data?: T,
    message?: string
  ): Response<SuccessResponse<T>> {
    const response: SuccessResponse<T> = { success: true }

    if (data !== undefined) {
      response.data = data
    }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatusCode.OK).json(response)
  }

  /**
   * Resposta para recursos encontrados
   * @template T
   * @param {Response} res - Response do Express
   * @param {T} data - Dados do recurso encontrado
   * @param {string} message - Mensagem personalizada (opcional)
   * @returns {Response<SuccessResponse<T>>} Response com status 200
   */
  public static found<T>(
    res: Response,
    data: T,
    message?: string
  ): Response<SuccessResponse<T>> {
    const response: SuccessResponse<T> = { success: true, data }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatusCode.OK).json(response)
  }

  /**
   * Resposta para recursos atualizados com sucesso
   * @template T
   * @param {Response} res - Response do Express
   * @param {T} data - Dados do recurso atualizado
   * @param {string} message - Mensagem personalizada
   * @returns {Response<SuccessResponse<T>>} Response com status 200
   */
  public static updated<T>(
    res: Response,
    data: T,
    message = 'Recurso atualizado com sucesso'
  ): Response<SuccessResponse<T>> {
    return res.status(HttpStatusCode.OK).json({
      success: true,
      data,
      message
    })
  }

  /**
   * Resposta para recursos deletados com sucesso
   * @param {Response} res - Response do Express
   * @returns {Response} Response com status 204 sem conteúdo
   */
  public static deleted(res: Response): Response {
    return res.status(HttpStatusCode.NO_CONTENT).send()
  }

  /**
   * Resposta para listas de recursos
   * @template T
   * @param {Response} res - Response do Express
   * @param {T[]} data - Array de dados
   * @param {string} message - Mensagem personalizada (opcional)
   * @returns {Response<SuccessResponse<T[]>>} Response com lista e total de itens
   */
  public static list<T>(
    res: Response,
    data: T[],
    message?: string
  ): Response<SuccessResponse<T[]>> {
    const response: SuccessResponse<T[]> = {
      success: true,
      data,
      total: data.length
    }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatusCode.OK).json(response)
  }

  /**
   * Resposta para listas paginadas de recursos
   * @template T
   * @param {Response} res - Response do Express
   * @param {T[]} data - Array de dados da página atual
   * @param {PaginationOptions} pagination - Opções de paginação
   * @param {string} message - Mensagem personalizada (opcional)
   * @returns {Response<SuccessResponse<T[]>>} Response com dados paginados
   */
  public static paginatedList<T>(
    res: Response,
    data: T[],
    pagination: PaginationOptions,
    message?: string
  ): Response<SuccessResponse<T[]>> {
    const { page, limit, total } = pagination
    const totalPages = Math.ceil(total / limit)

    const response: SuccessResponse<T[]> = {
      success: true,
      data,
      total,
      page,
      limit,
      totalPages
    }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatusCode.OK).json(response)
  }

  /**
   * Resposta personalizada com status code específico
   * @template T
   * @param {Response} res - Response do Express
   * @param {HttpStatusCode} statusCode - Código de status HTTP
   * @param {T} data - Dados da operação (opcional)
   * @param {string} message - Mensagem personalizada (opcional)
   * @param {Record<string, unknown>} additionalFields - Campos adicionais (opcional)
   * @returns {Response} Response personalizada
   */
  public static custom<T>(
    res: Response,
    statusCode: HttpStatusCode,
    data?: T,
    message?: string,
    additionalFields?: Record<string, unknown>
  ): Response<SuccessResponse<T> & Record<string, unknown>> {
    const response: SuccessResponse<T> & Record<string, unknown> = {
      success: true,
      ...additionalFields
    }

    if (data !== undefined) {
      response.data = data
    }

    if (message) {
      response.message = message
    }

    return res.status(statusCode).json(response)
  }

  /**
   * Resposta apenas com mensagem de sucesso
   * @param {Response} res - Response do Express
   * @param {string} message - Mensagem de sucesso
   * @param {HttpStatusCode} statusCode - Código de status (padrão: 200)
   * @returns {Response<SuccessResponse>} Response apenas com mensagem
   */
  public static message(
    res: Response,
    message: string,
    statusCode = HttpStatusCode.OK
  ): Response<SuccessResponse> {
    return res.status(statusCode).json({
      success: true,
      message
    })
  }

  /**
   * Resposta sem conteúdo
   * @param {Response} res - Response do Express
   * @returns {Response} Response com status 204
   */
  public static noContent(res: Response): Response {
    return res.status(HttpStatusCode.NO_CONTENT).send()
  }
}
