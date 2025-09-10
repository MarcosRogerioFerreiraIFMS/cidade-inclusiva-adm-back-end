import { UsuarioDependencies } from '@/dependencies/UsuarioDependencies'
import {
  adminOperationsRateLimit,
  emailSearchRateLimit,
  modificationRateLimit,
  readOperationsRateLimit,
  registerRateLimit,
  usuarioOperations
} from '@/middlewares'
import { Router } from 'express'

/**
 * - Rotas para operações de usuários
 * - Define endpoints CRUD para gerenciamento de usuários do sistema
 */
const UsuarioRoutes = Router()

/**
 * POST /usuarios
 * Endpoint para criação de novos usuários
 */
UsuarioRoutes.post(
  '/',
  registerRateLimit,
  ...usuarioOperations.register,
  UsuarioDependencies.controller.create
)

/**
 * GET /usuarios
 * Endpoint para listagem de todos os usuários (requer admin)
 */
UsuarioRoutes.get(
  '/',
  adminOperationsRateLimit,
  ...usuarioOperations.listAll,
  UsuarioDependencies.controller.findAll
)

/**
 * GET /usuarios/:id
 * Endpoint para buscar usuário específico por ID
 */
UsuarioRoutes.get(
  '/:id',
  readOperationsRateLimit,
  ...usuarioOperations.viewProfile,
  UsuarioDependencies.controller.findById
)

/**
 * GET /usuarios/email/:email
 * Endpoint para buscar usuário por email (requer admin)
 */
UsuarioRoutes.get(
  '/email/:email',
  emailSearchRateLimit,
  ...usuarioOperations.findByEmail,
  UsuarioDependencies.controller.findByEmail
)

/**
 * PUT /usuarios/:id
 * Endpoint para atualização de dados do usuário
 */
UsuarioRoutes.put(
  '/:id',
  modificationRateLimit,
  ...usuarioOperations.updateProfile,
  UsuarioDependencies.controller.update
)

/**
 * DELETE /usuarios/:id
 * Endpoint para remoção de usuário
 */
UsuarioRoutes.delete(
  '/:id',
  modificationRateLimit,
  ...usuarioOperations.deleteProfile,
  UsuarioDependencies.controller.delete
)

export { UsuarioRoutes }
