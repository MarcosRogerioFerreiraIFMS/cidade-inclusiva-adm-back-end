import { Router } from 'express'
import { AuditController } from '../controllers/AuditController'
import { adminOnly } from '../middlewares/compositeAuthMiddleware'
import { validateUUID } from '../middlewares/validationMiddleware'

/**
 * - Router para rotas de auditoria
 * - Define endpoints para consulta de logs e atividades do sistema
 * - Acesso restrito apenas para administradores
 */
const AuditRoutes = Router()
const auditController = new AuditController()

/**
 * GET /audit - Lista todos os logs de auditoria
 * Requer autenticação de administrador
 */
AuditRoutes.get('/', ...adminOnly, auditController.getLogs)

/**
 * GET /audit/user/:id - Lista logs de um usuário específico
 * Requer autenticação de administrador e ID válido
 */
AuditRoutes.get(
  '/user/:id',
  ...adminOnly,
  validateUUID('id'),
  auditController.getUserLogs
)

/**
 * GET /audit/suspicious - Lista atividades suspeitas
 * Requer autenticação de administrador
 */
AuditRoutes.get(
  '/suspicious',
  ...adminOnly,
  auditController.getSuspiciousActivity
)

export { AuditRoutes }
