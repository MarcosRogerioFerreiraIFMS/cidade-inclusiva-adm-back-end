import { Prisma } from '@prisma/client'
import { Request } from 'express'
import { db } from '../lib/prisma'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'

export interface AuditData {
  acao: string
  recursoId?: string
  tipoRecurso?: string
  dadosAntigos?: unknown
  dadosNovos?: unknown
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
      tipoRecurso: 'USUARIO'
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
      tipoRecurso: resourceType.toUpperCase(),
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
      tipoRecurso: resourceType.toUpperCase(),
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
      tipoRecurso: resourceType.toUpperCase(),
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
