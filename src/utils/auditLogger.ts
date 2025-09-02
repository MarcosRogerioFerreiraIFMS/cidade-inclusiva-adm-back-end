import { Prisma, TipoRecurso } from '@prisma/client'
import { Request } from 'express'
import { db } from '../database/prisma'
import { AuthenticatedRequest } from '../types/RequestTypes'

/**
 * Interface para dados de auditoria
 * Define a estrutura dos dados necessários para registrar uma ação de auditoria
 */
export interface AuditData {
  /** Ação realizada (ex: LOGIN_SUCCESS, CREATE_USUARIO, UPDATE_NOTICIA) */
  acao: string
  /** ID do recurso afetado (opcional) */
  recursoId?: string
  /** Tipo do recurso afetado (opcional) */
  tipoRecurso?: TipoRecurso
  /** Dados antes da alteração (para updates e deletes) */
  dadosAntigos?: unknown
  /** Dados após a alteração (para creates e updates) */
  dadosNovos?: unknown
}

/**
 * Converte string para TipoRecurso enum
 * Utility function para validar e converter tipos de recursos
 * @param {string} resourceType - Tipo do recurso em string
 * @returns {TipoRecurso | undefined} Enum TipoRecurso ou undefined se inválido
 */
function toTipoRecurso(resourceType: string): TipoRecurso | undefined {
  const upperType = resourceType.toUpperCase()
  if (Object.values(TipoRecurso).includes(upperType as TipoRecurso)) {
    return upperType as TipoRecurso
  }
  return undefined
}

/**
 * Classe responsável por registrar ações de auditoria no sistema
 * Permite rastreamento de ações dos usuários para fins de segurança e compliance
 */
export class AuditLogger {
  /**
   * Registra uma ação de auditoria no banco de dados
   * Método principal para logging de auditoria, captura dados da requisição
   * @param {AuthenticatedRequest | Request} req - Requisição HTTP contendo dados do usuário e contexto
   * @param {AuditData} data - Dados da ação a ser auditada
   * @returns {Promise<void>}
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
   * @param {Request} req - Requisição HTTP do login
   * @param {string} userId - ID do usuário que fez login
   * @returns {Promise<void>}
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
   * @param {Request} req - Requisição HTTP da tentativa de login
   * @param {string} email - Email usado na tentativa de login
   * @returns {Promise<void>}
   */
  static async logFailedLogin(req: Request, email: string): Promise<void> {
    await this.log(req, {
      acao: 'LOGIN_FAILED',
      dadosNovos: { email }
    })
  }

  /**
   * Registra criação de recurso
   * @param {AuthenticatedRequest} req - Requisição autenticada
   * @param {string} resourceType - Tipo do recurso criado
   * @param {string} resourceId - ID do recurso criado
   * @param {unknown} data - Dados do recurso criado
   * @returns {Promise<void>}
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
   * @param {AuthenticatedRequest} req - Requisição autenticada
   * @param {string} resourceType - Tipo do recurso atualizado
   * @param {string} resourceId - ID do recurso atualizado
   * @param {unknown} oldData - Dados anteriores do recurso
   * @param {unknown} newData - Dados atualizados do recurso
   * @returns {Promise<void>}
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
   * @param {AuthenticatedRequest} req - Requisição autenticada
   * @param {string} resourceType - Tipo do recurso excluído
   * @param {string} resourceId - ID do recurso excluído
   * @param {unknown} deletedData - Dados do recurso excluído
   * @returns {Promise<void>}
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
   * Busca logs de auditoria por critérios específicos
   * Permite filtrar e recuperar registros de auditoria para análise
   * @param {Object} filters - Filtros para busca
   * @param {string} [filters.usuarioId] - ID do usuário
   * @param {string} [filters.recursoId] - ID do recurso
   * @param {string} [filters.acao] - Ação realizada
   * @param {Date} [filters.dataInicio] - Data inicial do período
   * @param {Date} [filters.dataFim] - Data final do período
   * @param {number} [filters.limite] - Limite de registros (padrão: 100)
   * @returns {Promise<Array>} Lista de registros de auditoria com dados do usuário
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
