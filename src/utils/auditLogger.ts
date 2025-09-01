import { Prisma, TipoRecurso } from '@prisma/client'
import { Request } from 'express'
import { db } from '../database/prisma'
import { AuthenticatedRequest } from '../types/RequestTypes'

export interface AuditData {
  acao: string
  recursoId?: string
  tipoRecurso?: TipoRecurso
  dadosAntigos?: unknown
  dadosNovos?: unknown
}

/**
 * Converte string para TipoRecurso
 */
function toTipoRecurso(resourceType: string): TipoRecurso | undefined {
  const upperType = resourceType.toUpperCase()
  if (Object.values(TipoRecurso).includes(upperType as TipoRecurso)) {
    return upperType as TipoRecurso
  }
  return undefined
}

export class AuditLogger {
  /**
   * Registra uma ação de auditoria
   */
  static async log(
    req: AuthenticatedRequest | Request,
    data: AuditData
  ): Promise<void> {
    try {
      const userId = 'user' in req ? req.user?.userId : undefined
      const ip = req.ip || req.socket.remoteAddress
      const userAgent = req.headers['user-agent']

      await db.registroAuditoria.create({
        data: {
          acao: data.acao,
          usuarioId: userId,
          recursoId: data.recursoId,
          tipoRecurso: data.tipoRecurso,
          dadosAntigos: data.dadosAntigos as Prisma.InputJsonValue,
          dadosNovos: data.dadosNovos as Prisma.InputJsonValue,
          ip,
          userAgent
        }
      })
    } catch (error) {
      // Log de auditoria não deve quebrar a aplicação
      console.error('Erro ao registrar auditoria:', error)
    }
  }

  /**
   * Registra login bem-sucedido
   */
  static async logLogin(req: Request, userId: string): Promise<void> {
    await this.log(req, {
      acao: 'LOGIN_SUCCESS',
      recursoId: userId,
      tipoRecurso: TipoRecurso.USUARIO
    })
  }

  /**
   * Registra tentativa de login falhada
   */
  static async logFailedLogin(req: Request, email: string): Promise<void> {
    await this.log(req, {
      acao: 'LOGIN_FAILED',
      dadosNovos: { email }
    })
  }

  /**
   * Registra criação de recurso
   */
  static async logCreate(
    req: AuthenticatedRequest,
    resourceType: string,
    resourceId: string,
    data: unknown
  ): Promise<void> {
    await this.log(req, {
      acao: `CREATE_${resourceType.toUpperCase()}`,
      recursoId: resourceId,
      tipoRecurso: toTipoRecurso(resourceType),
      dadosNovos: data
    })
  }

  /**
   * Registra atualização de recurso
   */
  static async logUpdate(
    req: AuthenticatedRequest,
    resourceType: string,
    resourceId: string,
    oldData: unknown,
    newData: unknown
  ): Promise<void> {
    await this.log(req, {
      acao: `UPDATE_${resourceType.toUpperCase()}`,
      recursoId: resourceId,
      tipoRecurso: toTipoRecurso(resourceType),
      dadosAntigos: oldData,
      dadosNovos: newData
    })
  }

  /**
   * Registra exclusão de recurso
   */
  static async logDelete(
    req: AuthenticatedRequest,
    resourceType: string,
    resourceId: string,
    deletedData: unknown
  ): Promise<void> {
    await this.log(req, {
      acao: `DELETE_${resourceType.toUpperCase()}`,
      recursoId: resourceId,
      tipoRecurso: toTipoRecurso(resourceType),
      dadosAntigos: deletedData
    })
  }

  /**
   * Busca logs de auditoria por critérios
   */
  static async getLogs(filters: {
    usuarioId?: string
    recursoId?: string
    acao?: string
    dataInicio?: Date
    dataFim?: Date
    limite?: number
  }) {
    return await db.registroAuditoria.findMany({
      where: {
        usuarioId: filters.usuarioId,
        recursoId: filters.recursoId,
        acao: filters.acao,
        criadoEm: {
          gte: filters.dataInicio,
          lte: filters.dataFim
        }
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        criadoEm: 'desc'
      },
      take: filters.limite || 100
    })
  }
}
