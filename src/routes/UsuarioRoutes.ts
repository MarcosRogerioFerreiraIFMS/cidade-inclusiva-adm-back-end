import { Router } from 'express'
import { UsuarioDependencies } from '../dependencies/UsuarioDependencies'
import { usuarioOperations } from '../middlewares/compositeAuthMiddleware'

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
  ...usuarioOperations.register,
  UsuarioDependencies.controller.create
)

/**
 * GET /usuarios
 * Endpoint para listagem de todos os usuários (requer admin)
 */
UsuarioRoutes.get(
  '/',
  ...usuarioOperations.listAll,
  UsuarioDependencies.controller.findAll
)

/**
 * GET /usuarios/:id
 * Endpoint para buscar usuário específico por ID
 */
UsuarioRoutes.get(
  '/:id',
  ...usuarioOperations.viewProfile,
  UsuarioDependencies.controller.findById
)

/**
 * GET /usuarios/email/:email
 * Endpoint para buscar usuário por email (requer admin)
 */
UsuarioRoutes.get(
  '/email/:email',
  ...usuarioOperations.findByEmail,
  UsuarioDependencies.controller.findByEmail
)

/**
 * PUT /usuarios/:id
 * Endpoint para atualização de dados do usuário
 */
UsuarioRoutes.put(
  '/:id',
  ...usuarioOperations.updateProfile,
  UsuarioDependencies.controller.update
)

/**
 * DELETE /usuarios/:id
 * Endpoint para remoção de usuário
 */
UsuarioRoutes.delete(
  '/:id',
  ...usuarioOperations.deleteProfile,
  UsuarioDependencies.controller.delete
)

export { UsuarioRoutes }
