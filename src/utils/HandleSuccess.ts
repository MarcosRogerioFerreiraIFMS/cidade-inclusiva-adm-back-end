import { Response } from 'express'
import { HttpStatus } from '../enums/HttpStatus'

interface SuccessResponse<T = unknown> {
  data?: T
  message?: string
  total?: number
  page?: number
  limit?: number
  totalPages?: number
}

interface PaginationOptions {
  page: number
  limit: number
  total: number
}

export class HandleSuccess {
  public static created<T>(
    res: Response,
    data: T,
    message = 'Recurso criado com sucesso'
  ): Response<SuccessResponse<T>> {
    return res.status(HttpStatus.CREATED).json({
      data,
      message
    })
  }

  public static ok<T>(
    res: Response,
    data?: T,
    message?: string
  ): Response<SuccessResponse<T>> {
    const response: SuccessResponse<T> = {}

    if (data !== undefined) {
      response.data = data
    }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatus.OK).json(response)
  }

  public static found<T>(
    res: Response,
    data: T,
    message?: string
  ): Response<SuccessResponse<T>> {
    const response: SuccessResponse<T> = { data }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatus.OK).json(response)
  }

  public static updated<T>(
    res: Response,
    data: T,
    message = 'Recurso atualizado com sucesso'
  ): Response<SuccessResponse<T>> {
    return res.status(HttpStatus.OK).json({
      data,
      message
    })
  }

  public static deleted(
    res: Response,
    message = 'Recurso deletado com sucesso'
  ): Response<SuccessResponse> {
    return res.status(HttpStatus.NO_CONTENT).json({
      message
    })
  }

  public static list<T>(
    res: Response,
    data: T[],
    message?: string
  ): Response<SuccessResponse<T[]>> {
    const response: SuccessResponse<T[]> = {
      data,
      total: data.length
    }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatus.OK).json(response)
  }

  public static paginatedList<T>(
    res: Response,
    data: T[],
    pagination: PaginationOptions,
    message?: string
  ): Response<SuccessResponse<T[]>> {
    const { page, limit, total } = pagination
    const totalPages = Math.ceil(total / limit)

    const response: SuccessResponse<T[]> = {
      data,
      total,
      page,
      limit,
      totalPages
    }

    if (message) {
      response.message = message
    }

    return res.status(HttpStatus.OK).json(response)
  }

  public static custom<T>(
    res: Response,
    statusCode: HttpStatus,
    data?: T,
    message?: string,
    additionalFields?: Record<string, unknown>
  ): Response<SuccessResponse<T> & Record<string, unknown>> {
    const response: SuccessResponse<T> & Record<string, unknown> = {
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

  public static message(
    res: Response,
    message: string,
    statusCode = HttpStatus.OK
  ): Response<SuccessResponse> {
    return res.status(statusCode).json({
      message
    })
  }

  public static noContent(res: Response): Response {
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}
