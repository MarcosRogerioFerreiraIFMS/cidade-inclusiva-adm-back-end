import { Router } from 'express'
import { AuditController } from '../controllers/AuditController'
import { adminOnly } from '../middlewares/compositeAuthMiddleware'
import { validateUUID } from '../middlewares/validationMiddleware'

const AuditRoutes = Router()
const auditController = new AuditController()

AuditRoutes.get('/', ...adminOnly, auditController.getLogs)

AuditRoutes.get(
  '/user/:id',
  ...adminOnly,
  validateUUID('id'),
  auditController.getUserLogs
)

AuditRoutes.get(
  '/suspicious',
  ...adminOnly,
  auditController.getSuspiciousActivity
)

export { AuditRoutes }
