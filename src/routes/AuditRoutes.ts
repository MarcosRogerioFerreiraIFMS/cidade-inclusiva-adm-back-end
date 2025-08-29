import { Router } from 'express'
import { AuditController } from '../controllers/AuditController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validateUUID } from '../middlewares/validationMiddleware'

const AuditRoutes = Router()
const auditController = new AuditController()

// Apenas usuários autenticados podem ver logs de auditoria
// Em um sistema real, apenas admins deveriam ter acesso

AuditRoutes.get('/', authMiddleware, auditController.getLogs)

AuditRoutes.get(
  '/user/:id',
  authMiddleware,
  validateUUID('id'),
  auditController.getUserLogs
)

AuditRoutes.get(
  '/suspicious',
  authMiddleware,
  auditController.getSuspiciousActivity
)

export { AuditRoutes }
