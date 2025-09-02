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
 * @route POST /usuarios
 * @body {UsuarioCreateDTO} Dados do usuário (nome, email, senha, telefone, endereco, foto)
 * @returns {UsuarioResponseDTO} Dados do usuário criado
 */
UsuarioRoutes.post(
  '/',
  ...usuarioOperations.register,
  UsuarioDependencies.controller.create
)

/**
 * GET /usuarios
 * Endpoint para listagem de todos os usuários (requer admin)
 * @route GET /usuarios
 * @header {string} Authorization - Bearer token JWT de administrador
 * @returns {UsuarioResponseDTO[]} Lista de todos os usuários
 */
UsuarioRoutes.get(
  '/',
  ...usuarioOperations.listAll,
  UsuarioDependencies.controller.findAll
)

/**
 * GET /usuarios/:id
 * Endpoint para buscar usuário específico por ID
 * @route GET /usuarios/:id
 * @param {string} id - ID do usuário
 * @header {string} Authorization - Bearer token JWT
 * @returns {UsuarioResponseDTO} Dados do usuário encontrado
 */
UsuarioRoutes.get(
  '/:id',
  ...usuarioOperations.viewProfile,
  UsuarioDependencies.controller.findById
)

/**
 * GET /usuarios/email/:email
 * Endpoint para buscar usuário por email (requer admin)
 * @route GET /usuarios/email/:email
 * @param {string} email - Email do usuário
 * @header {string} Authorization - Bearer token JWT de administrador
 * @returns {UsuarioResponseDTO} Dados do usuário encontrado
 */
UsuarioRoutes.get(
  '/email/:email',
  ...usuarioOperations.findByEmail,
  UsuarioDependencies.controller.findByEmail
)

/**
 * PUT /usuarios/:id
 * Endpoint para atualização de dados do usuário
 * @route PUT /usuarios/:id
 * @param {string} id - ID do usuário
 * @body {UsuarioUpdateDTO} Dados a serem atualizados
 * @header {string} Authorization - Bearer token JWT
 * @returns {UsuarioResponseDTO} Dados do usuário atualizado
 */
UsuarioRoutes.put(
  '/:id',
  ...usuarioOperations.updateProfile,
  UsuarioDependencies.controller.update
)

/**
 * DELETE /usuarios/:id
 * Endpoint para remoção de usuário
 * @route DELETE /usuarios/:id
 * @param {string} id - ID do usuário
 * @header {string} Authorization - Bearer token JWT
 * @returns {void} Confirmação de remoção
 */
UsuarioRoutes.delete(
  '/:id',
  ...usuarioOperations.deleteProfile,
  UsuarioDependencies.controller.delete
)

export { UsuarioRoutes }
