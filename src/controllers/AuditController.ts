import { ControllerRequest } from '../types/RequestTypes'
import { AuditLogger } from '../utils/auditLogger'
import { HandleSuccess } from '../utils/HandleSuccess'

/**
 * - Controller responsável pelo gerenciamento de auditoria:
 * - Expõe endpoints para consulta e análise de logs de auditoria
 * - Implementa funcionalidades para rastreamento de atividades do sistema
 */
export class AuditController {
  /**
   * Busca logs de auditoria de atividades do sistema
   * @type {ControllerRequest}
   */
  getLogs: ControllerRequest = async (req, res, next) => {
    try {
      const {
        usuarioId,
        recursoId,
        acao,
        dataInicio,
        dataFim,
        limite = 50
      } = req.query

      const logs = await AuditLogger.getLogs({
        usuarioId: usuarioId as string,
        recursoId: recursoId as string,
        acao: acao as string,
        dataInicio: dataInicio ? new Date(dataInicio as string) : undefined,
        dataFim: dataFim ? new Date(dataFim as string) : undefined,
        limite: parseInt(limite as string, 10)
      })

      HandleSuccess.ok(res, logs, 'Logs de auditoria recuperados com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca logs específicos de um usuário
   * @type {ControllerRequest}
   */
  getUserLogs: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const { limite = 20 } = req.query

      const logs = await AuditLogger.getLogs({
        recursoId: id,
        limite: parseInt(limite as string, 10)
      })

      HandleSuccess.ok(res, logs, 'Histórico do usuário recuperado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  /**
   * Busca atividades suspeitas recentes no sistema
   * @type {ControllerRequest}
   */
  getSuspiciousActivity: ControllerRequest = async (req, res, next) => {
    try {
      // Definir data de referência para busca
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

      // Buscar muitas tentativas de login falhadas
      const failedLogins = await AuditLogger.getLogs({
        acao: 'LOGIN_FAILED',
        dataInicio: oneDayAgo,
        limite: 100
      })

      // Buscar muitas deleções recentes
      const recentDeletes = await AuditLogger.getLogs({
        acao: 'DELETE_USUARIO',
        dataInicio: oneDayAgo,
        limite: 100
      })

      HandleSuccess.ok(
        res,
        {
          failedLogins: failedLogins.length,
          recentDeletes: recentDeletes.length,
          details: {
            failedLogins,
            recentDeletes
          }
        },
        'Atividades suspeitas analisadas'
      )
    } catch (error: unknown) {
      next(error)
    }
  }
}
