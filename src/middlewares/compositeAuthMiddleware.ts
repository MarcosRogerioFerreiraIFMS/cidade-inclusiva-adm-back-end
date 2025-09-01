import { TipoRecurso, TipoUsuario } from '@prisma/client'
import { authMiddleware, optionalAuthMiddleware } from './authMiddleware'
import {
  requireAdmin,
  requireOwnershipOrAdmin,
  requireRole
} from './authorizationMiddleware'
import {
  requireSelfLikeAction,
  requireSelfOrAdmin
} from './selfActionMiddleware'
import { validateRequiredBody, validateUUID } from './validationMiddleware'

/**
 * Middleware compostos que abstraem toda a lógica de autenticação e autorização
 * Evita repetição de código e facilita manutenção
 */

/**
 * Middleware para operações que requerem apenas autenticação
 * Uso: Criar recursos próprios, visualizar perfil próprio
 */
export const authenticated = [authMiddleware]

/**
 * Middleware para operações que podem ser feitas com ou sem autenticação
 * Uso: Listar recursos públicos, visualizar detalhes públicos
 */
export const optionallyAuthenticated = [optionalAuthMiddleware]

/**
 * Middleware para operações administrativas
 * Uso: Gerenciar sistema, acessar dados de todos os usuários
 */
export const adminOnly = [authMiddleware, requireAdmin]

/**
 * Middleware para operações específicas de usuários comuns
 * Uso: Funcionalidades exclusivas de usuários não-admin
 */
export const userOnly = [authMiddleware, requireRole([TipoUsuario.USUARIO])]

// ====== MIDDLEWARES ESPECÍFICOS POR RECURSO ======

/**
 * Middlewares para operações de USUÁRIO
 */
export const usuarioOperations = {
  // GET /usuarios - Apenas admins podem listar todos os usuários
  listAll: [authMiddleware, requireAdmin],

  // GET /usuarios/:id - Usuário pode ver próprio perfil, admin pode ver qualquer um
  viewProfile: [
    authMiddleware,
    validateUUID('id'),
    requireOwnershipOrAdmin(TipoRecurso.USUARIO)
  ],

  // PUT /usuarios/:id - Usuário pode editar próprio perfil, admin pode editar qualquer um
  updateProfile: [
    authMiddleware,
    validateUUID('id'),
    validateRequiredBody([]),
    requireOwnershipOrAdmin(TipoRecurso.USUARIO)
  ],

  // DELETE /usuarios/:id - Usuário pode deletar próprio perfil, admin pode deletar qualquer um
  deleteProfile: [
    authMiddleware,
    validateUUID('id'),
    requireOwnershipOrAdmin(TipoRecurso.USUARIO)
  ],

  // POST /usuarios - Registro público (não requer autenticação)
  register: [
    validateRequiredBody(['nome', 'telefone', 'email', 'senha', 'endereco'])
  ],

  // GET /usuarios/email/:email - Apenas admins podem buscar por email
  findByEmail: [authMiddleware, requireAdmin]
}

/**
 * Middlewares para operações de NOTÍCIAS
 */
export const noticiaOperations = {
  // GET /noticias - Público pode visualizar, mas dados extras para usuários autenticados
  list: [optionalAuthMiddleware],

  // GET /noticias/:id - Público pode visualizar, mas dados extras para usuários autenticados
  view: [optionalAuthMiddleware, validateUUID('id')],

  // POST /noticias - Apenas admins podem criar
  create: [
    authMiddleware,
    requireAdmin,
    validateRequiredBody(['titulo', 'conteudo', 'categoria'])
  ],

  // PUT /noticias/:id - Apenas admins podem editar
  update: [
    authMiddleware,
    requireAdmin,
    validateUUID('id'),
    validateRequiredBody([])
  ],

  // DELETE /noticias/:id - Apenas admins podem deletar
  delete: [authMiddleware, requireAdmin, validateUUID('id')]
}

/**
 * Middlewares para operações de PROFISSIONAIS
 */
export const profissionalOperations = {
  // GET /profissionais - Público pode visualizar
  list: [optionalAuthMiddleware],

  // GET /profissionais/:id - Público pode visualizar
  view: [optionalAuthMiddleware, validateUUID('id')],

  // POST /profissionais - Apenas admins podem criar
  create: [
    authMiddleware,
    requireAdmin,
    validateRequiredBody(['nome', 'telefone', 'email', 'especialidade'])
  ],

  // PUT /profissionais/:id - Apenas admins podem editar
  update: [
    authMiddleware,
    requireAdmin,
    validateUUID('id'),
    validateRequiredBody([])
  ],

  // DELETE /profissionais/:id - Apenas admins podem deletar
  delete: [authMiddleware, requireAdmin, validateUUID('id')]
}

/**
 * Middlewares para operações de COMENTÁRIOS
 */
export const comentarioOperations = {
  // GET /comentarios - Público pode visualizar
  list: [optionalAuthMiddleware],

  // GET /comentarios/:id - Público pode visualizar
  view: [optionalAuthMiddleware, validateUUID('id')],

  // POST /comentarios - Apenas usuários autenticados podem criar
  create: [authMiddleware, validateRequiredBody(['conteudo', 'usuarioId'])],

  // PUT /comentarios/:id - Apenas o autor ou admin podem editar
  update: [
    authMiddleware,
    validateUUID('id'),
    validateRequiredBody([]),
    requireOwnershipOrAdmin(TipoRecurso.COMENTARIO)
  ],

  // DELETE /comentarios/:id - Apenas o autor ou admin podem deletar
  delete: [
    authMiddleware,
    validateUUID('id'),
    requireOwnershipOrAdmin(TipoRecurso.COMENTARIO)
  ],

  // GET /comentarios/profissional/:profissionalId - Público pode visualizar comentários de um profissional
  findByProfessional: [optionalAuthMiddleware, validateUUID('profissionalId')],

  // GET /comentarios/profissional/:profissionalId/visiveis - Público pode visualizar comentários visíveis
  findVisibleByProfessional: [
    optionalAuthMiddleware,
    validateUUID('profissionalId')
  ]
}

/**
 * Middlewares para operações de LIKES
 */
export const likeOperations = {
  // GET /likes/:id - Público pode visualizar
  view: [optionalAuthMiddleware, validateUUID('id')],

  // PATCH /likes/toggle/:usuarioId/:comentarioId - Apenas usuários autenticados, e apenas para si mesmos
  toggle: [
    authMiddleware,
    validateUUID('usuarioId'),
    validateUUID('comentarioId'),
    requireSelfLikeAction // Verifica se o usuário pode dar like por si mesmo
  ],

  // DELETE /likes/:id - Apenas o autor ou admin podem deletar
  delete: [
    authMiddleware,
    validateUUID('id'),
    requireOwnershipOrAdmin(TipoRecurso.LIKE)
  ],

  // GET /likes/comentario/:comentarioId - Público pode visualizar likes de um comentário
  findByComment: [optionalAuthMiddleware, validateUUID('comentarioId')],

  // GET /likes/usuario/:usuarioId - Apenas o próprio usuário ou admin podem ver seus likes
  findByUser: [authMiddleware, validateUUID('usuarioId'), requireSelfOrAdmin]
}

/**
 * Middlewares para operações de AUDITORIA
 */
export const auditOperations = {
  // GET /audit - Apenas admins podem visualizar logs
  list: [authMiddleware, requireAdmin],

  // GET /audit/:id - Apenas admins podem visualizar log específico
  view: [authMiddleware, requireAdmin, validateUUID('id')]
}

/**
 * Middlewares para operações de AUTENTICAÇÃO
 */
export const authOperations = {
  // POST /auth/login - Público pode fazer login
  login: [validateRequiredBody(['email', 'senha'])],

  // GET /auth/validate-token - Público pode validar token
  validateToken: []
}

/**
 * Função helper para criar middlewares customizados rapidamente
 */
export const createCustomMiddleware = (middlewares: unknown[]) => middlewares

/**
 * Middleware para operações que requerem propriedade específica de recurso
 */
export const requireResourceOwnership = (resourceType: TipoRecurso) => [
  authMiddleware,
  validateUUID('id'),
  requireOwnershipOrAdmin(resourceType)
]

/**
 * Middleware para operações que requerem validação de corpo + propriedade
 */
export const requireOwnershipWithValidation = (
  resourceType: TipoRecurso,
  requiredFields: string[] = []
) => [
  authMiddleware,
  validateUUID('id'),
  validateRequiredBody(requiredFields),
  requireOwnershipOrAdmin(resourceType)
]
