import { Response } from 'express'
import { HttpStatusCode } from '../enums/HttpStatusCode'

interface SuccessResponse<T = unknown> {
  success: true
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
    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      data,
      message
    })
  }

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

  public static deleted(res: Response): Response {
    return res.status(HttpStatusCode.NO_CONTENT).send()
  }

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

  public static noContent(res: Response): Response {
    return res.status(HttpStatusCode.NO_CONTENT).send()
  }
}
