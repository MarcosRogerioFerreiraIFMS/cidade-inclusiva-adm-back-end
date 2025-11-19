import { TipoRecurso, UsuarioTipo } from '@/enums'
import { authMiddleware, optionalAuthMiddleware } from './authMiddleware'
import {
  requireAdmin,
  requireOwnershipOnly,
  requireOwnershipOrAdmin,
  requireOwnershipOrAdminForView,
  requireRole
} from './authorizationMiddleware'
import { requiredFields } from './requiredFields'
import { requireSelfOrAdmin } from './selfActionMiddleware'
import { validateRequiredBody, validateUUID } from './validationMiddleware'

/**
 * - Módulo de middlewares compostos para autenticação e autorização
 * - Combina múltiplos middlewares em configurações pré-definidas para diferentes cenários
 * - Facilita o uso consistente de validações e autorizações em toda a aplicação
 */

/**
 * - Middleware para operações que requerem apenas autenticação
 * - Uso: Criar recursos próprios, visualizar perfil próprio
 */
export const authenticated = [authMiddleware]

/**
 * - Middleware para operações que podem ser feitas com ou sem autenticação
 * - Uso: Listar recursos públicos, visualizar detalhes públicos
 */
export const optionallyAuthenticated = [optionalAuthMiddleware]

/**
 * - Middleware para operações administrativas
 * - Uso: Gerenciar sistema, acessar dados de todos os usuários
 */
export const adminOnly = [authMiddleware, requireAdmin]

/**
 * - Middleware para operações específicas de usuários comuns
 * - Uso: Funcionalidades exclusivas de usuários não-admin
 */
export const userOnly = [authMiddleware, requireRole([UsuarioTipo.USUARIO])]

/**
 *
 * Conjunto de middlewares pré-configurados para operações específicas por tipo de recurso
 * Cada conjunto inclui as validações e autorizações apropriadas para o contexto
 */

/**
 * - Middlewares para operações de USUÁRIO
 * - Incluem validações específicas para gerenciamento de perfis de usuário
 */
export const usuarioOperations = {
  /** GET /usuarios - Apenas admins podem listar todos os usuários */
  list: [...adminOnly],

  /** GET /usuarios/:id - Usuário pode ver a si mesmo, admin pode ver qualquer um (inclusive outros admins) */
  view: [
    ...authenticated,
    validateUUID('id'),
    requireOwnershipOrAdminForView(TipoRecurso.USUARIO)
  ],

  /** PUT /usuarios/:id - Usuário pode editar a si mesmo, admin pode editar qualquer um (exceto outros admins) */
  update: [
    ...authenticated,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.usuario.update]),
    requireOwnershipOrAdmin(TipoRecurso.USUARIO)
  ],

  /** DELETE /usuarios/:id - Usuário pode deletar a si mesmo, admin pode deletar qualquer um (exceto outros admins) */
  delete: [
    ...authenticated,
    validateUUID('id'),
    requireOwnershipOrAdmin(TipoRecurso.USUARIO)
  ],

  /** POST /usuarios - Registro público (não requer autenticação) */
  create: [validateRequiredBody([...requiredFields.usuario.create])],

  /** POST /usuarios/admin - Apenas admins podem criar outros admins */
  createAdmin: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.admin.create])
  ],

  /** GET /usuarios/email/:email - Apenas admins podem buscar por email */
  findByEmail: [...adminOnly]
}

/**
 * - Middlewares para operações de NOTÍCIAS
 * - Incluem validações específicas para gerenciamento de conteúdo jornalístico
 */
export const noticiaOperations = {
  /** GET /noticias - Requer autenticação para listar */
  list: [...authenticated],

  /** GET /noticias/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** POST /noticias - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.noticia.create])
  ],

  /** PUT /noticias/:id - Apenas admins podem editar */
  update: [
    ...adminOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.noticia.update])
  ],

  /** DELETE /noticias/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de PROFISSIONAIS
 * - Incluem validações específicas para gerenciamento de dados profissionais
 */
export const profissionalOperations = {
  /** GET /profissionais - Requer autenticação para listar */
  list: [...authenticated],

  /** GET /profissionais/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** POST /profissionais - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.profissional.create])
  ],

  /** PUT /profissionais/:id - Apenas admins podem editar */
  update: [
    ...adminOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.profissional.update])
  ],

  /** DELETE /profissionais/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de COMENTÁRIOS
 * - Incluem validações específicas para sistema de comentários e moderação
 */
export const comentarioOperations = {
  /** GET /comentarios/:id - Apenas o autor ou admin podem visualizar */
  view: [
    ...authenticated,
    requireOwnershipOrAdmin(TipoRecurso.COMENTARIO),
    validateUUID('id')
  ],

  /** POST /comentarios - Apenas usuários comuns (não admins) podem criar */
  create: [
    ...userOnly,
    validateRequiredBody([...requiredFields.comentario.create])
  ],

  /** PUT /comentarios/:id - Apenas o autor pode editar */
  update: [
    ...userOnly,
    requireOwnershipOnly(TipoRecurso.COMENTARIO),
    validateUUID('id'),
    validateRequiredBody([...requiredFields.comentario.update])
  ],

  /** DELETE /comentarios/:id - Apenas o autor pode deletar */
  delete: [
    ...userOnly,
    requireOwnershipOnly(TipoRecurso.COMENTARIO),
    validateUUID('id')
  ],

  /** PATCH /comentarios/:id/visibilidade - Apenas admins podem alterar visibilidade */
  toggleVisibility: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de LIKES
 * - Incluem validações específicas para sistema de likes e reações
 */
export const likeOperations = {
  /** GET /likes/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** PATCH /likes/toggle/:comentarioId - Apenas usuários autenticados */
  toggle: [...authenticated, validateUUID('comentarioId')],

  /** DELETE /likes/:id - Apenas o autor ou admin podem deletar */
  delete: [
    ...authenticated,
    requireOwnershipOrAdmin(TipoRecurso.LIKE),
    validateUUID('id')
  ],

  /** GET /likes/comentario/:comentarioId - Requer autenticação para visualizar */
  findByComment: [...authenticated, validateUUID('comentarioId')],

  /** GET /likes/usuario/:usuarioId - Apenas o próprio usuário ou admin podem ver seus likes */
  findByUser: [...authenticated, requireSelfOrAdmin, validateUUID('usuarioId')]
}

/**
 * - Middlewares para operações de AUTENTICAÇÃO
 * - Incluem validações específicas para login e validação de tokens
 */
export const authOperations = {
  /** POST /auth/login - Público pode fazer login */
  login: [validateRequiredBody([...requiredFields.auth.login])],

  /** GET /auth/me - Usuário autenticado pode ver seus dados */
  me: [...authenticated]
}

/**
 * - Middlewares para operações de MOBILIDADE
 * - Incluem validações específicas para gerenciamento de dados de mobilidade urbana
 * - Apenas usuários normais (não admins) podem criar, editar e deletar suas mobilidades
 */
export const mobilidadeOperations = {
  /** GET /mobilidades - Apenas admins podem listar */
  list: [...adminOnly],

  /** GET /mobilidades/:id - Admin pode visualizar, ou o proprietário (usuário normal) */
  view: [
    ...authenticated,
    validateUUID('id'),
    requireOwnershipOrAdminForView(TipoRecurso.MOBILIDADE)
  ],

  /** POST /mobilidades - Apenas usuários normais podem criar */
  create: [
    ...userOnly,
    validateRequiredBody([...requiredFields.mobilidade.create])
  ],

  /** PUT /mobilidades/:id - Apenas o proprietário (usuário normal) pode editar */
  update: [
    ...userOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.mobilidade.update]),
    requireOwnershipOnly(TipoRecurso.MOBILIDADE)
  ],

  /** DELETE /mobilidades/:id - Apenas o proprietário (usuário normal) pode deletar */
  delete: [
    ...userOnly,
    validateUUID('id'),
    requireOwnershipOnly(TipoRecurso.MOBILIDADE)
  ],

  /** GET /mobilidades/usuario/:usuarioId - Apenas o próprio usuário ou admin podem ver suas mobilidades */
  findByUser: [...authenticated, requireSelfOrAdmin, validateUUID('usuarioId')],

  /** GET /mobilidades/status/:status - Requer autenticação para visualizar por status */
  findByStatus: [...authenticated]
}

/**
 * - Middlewares para operações de MOTORISTAS
 * - Incluem validações específicas para gerenciamento de dados de motoristas
 */
export const motoristaOperations = {
  /** GET /motoristas - Requer autenticação para visualizar */
  list: [...authenticated],

  /** GET /motoristas/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** POST /motoristas - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.motorista.create])
  ],

  /** PUT /motoristas/:id - Apenas admins podem editar */
  update: [
    ...adminOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.motorista.update])
  ],

  /** DELETE /motoristas/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de VEÍCULOS
 * - Incluem validações específicas para gerenciamento de dados de veículos
 */
export const veiculoOperations = {
  /** GET /veiculos - Requer autenticação para visualizar */
  list: [...authenticated],

  /** GET /veiculos/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** POST /veiculos - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.veiculo.create])
  ],

  /** PUT /veiculos/:id - Apenas admins podem editar */
  update: [
    ...adminOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.veiculo.update])
  ],

  /** DELETE /veiculos/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de MANUTENÇÕES
 * - Incluem validações específicas para gerenciamento de dados de empresas de manutenção
 */
export const manutencaoOperations = {
  /** GET /manutencoes - Requer autenticação para visualizar */
  list: [...authenticated],

  /** GET /manutencoes/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** POST /manutencoes - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.manutencao.create])
  ],

  /** PUT /manutencoes/:id - Apenas admins podem editar */
  update: [
    ...adminOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.manutencao.update])
  ],

  /** DELETE /manutencoes/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')],

  /** GET /manutencoes/email/:email - Apenas admins podem buscar por email */
  findByEmail: [...adminOnly],

  /** GET /manutencoes/especialidade/:especialidade - Requer autenticação para buscar por especialidade */
  findByEspecialidade: [...authenticated]
}

/**
 * - Middlewares para operações de ACESSIBILIDADE URBANA
 * - Incluem validações específicas para gerenciamento de dados de acessibilidade urbana
 */
export const acessibilidadeUrbanaOperations = {
  /** GET /acessibilidade-urbana - Requer autenticação para visualizar */
  list: [...authenticated],

  /** GET /acessibilidade-urbana/:id - Requer autenticação para visualizar */
  view: [...authenticated, validateUUID('id')],

  /** POST /acessibilidade-urbana - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([...requiredFields.acessibilidadeUrbana.create])
  ],

  /** PUT /acessibilidade-urbana/:id - Apenas admins podem editar */
  update: [
    ...adminOnly,
    validateUUID('id'),
    validateRequiredBody([...requiredFields.acessibilidadeUrbana.update])
  ],

  /** DELETE /acessibilidade-urbana/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')],

  /** GET /acessibilidade-urbana/categoria/:categoria - Requer autenticação para visualizar por categoria */
  findByCategoria: [...authenticated],

  /** GET /acessibilidade-urbana/email/:email - Apenas admins podem buscar por email */
  findByEmail: [...adminOnly]
}

/**
 * Funções utilitárias para criação de middlewares customizados
 */

/**
 * Função helper para criar middlewares customizados rapidamente
 * @param {unknown[]} middlewares - Array de middlewares a serem aplicados
 * @returns {unknown[]} Array de middlewares configurados
 */
export const createCustomMiddleware = (middlewares: unknown[]): unknown[] =>
  middlewares

/**
 * Middleware para operações que requerem propriedade específica de recurso
 * @param {TipoRecurso} resourceType - Tipo do recurso a ser verificado
 * @returns {unknown[]} Array de middlewares para verificação de propriedade
 */
export const requireResourceOwnership = (
  resourceType: TipoRecurso
): unknown[] => [
  authMiddleware,
  validateUUID('id'),
  requireOwnershipOrAdmin(resourceType)
]

/**
 * Middleware para operações que requerem validação de corpo + propriedade
 * @param {TipoRecurso} resourceType - Tipo do recurso a ser verificado
 * @param {string[]} requiredFields - Campos obrigatórios no corpo da requisição
 * @returns {unknown[]} Array de middlewares para validação completa
 */
export const requireOwnershipWithValidation = (
  resourceType: TipoRecurso,
  requiredFields: string[] = []
): unknown[] => [
  authMiddleware,
  validateUUID('id'),
  validateRequiredBody(requiredFields),
  requireOwnershipOrAdmin(resourceType)
]
