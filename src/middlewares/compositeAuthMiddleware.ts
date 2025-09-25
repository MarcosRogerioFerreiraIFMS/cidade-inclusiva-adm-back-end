import { TipoRecurso, TipoUsuario } from '@/enums'
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
export const userOnly = [authMiddleware, requireRole([TipoUsuario.USUARIO])]

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
  listAll: [...adminOnly],

  /** GET /usuarios/:id - Usuário pode ver próprio perfil, admin pode ver qualquer um */
  viewProfile: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.USUARIO),
    validateUUID('id')
  ],

  /** PUT /usuarios/:id - Usuário pode editar próprio perfil, admin pode editar qualquer um */
  updateProfile: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.USUARIO),
    validateUUID('id'),
    validateRequiredBody([])
  ],

  /** DELETE /usuarios/:id - Usuário pode deletar próprio perfil, admin pode deletar qualquer um */
  deleteProfile: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.USUARIO),
    validateUUID('id')
  ],

  /** POST /usuarios - Registro público (não requer autenticação) */
  register: [
    validateRequiredBody(['nome', 'telefone', 'email', 'senha', 'endereco'])
  ],

  /** GET /usuarios/email/:email - Apenas admins podem buscar por email */
  findByEmail: [...adminOnly]
}

/**
 * - Middlewares para operações de NOTÍCIAS
 * - Incluem validações específicas para gerenciamento de conteúdo jornalístico
 */
export const noticiaOperations = {
  /** GET /noticias - Público pode visualizar, mas dados extras para usuários autenticados */
  list: [],

  /** GET /noticias/:id - Público pode visualizar, mas dados extras para usuários autenticados */
  view: [validateUUID('id')],

  /** POST /noticias - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody(['titulo', 'conteudo', 'categoria'])
  ],

  /** PUT /noticias/:id - Apenas admins podem editar */
  update: [...adminOnly, validateUUID('id'), validateRequiredBody([])],

  /** DELETE /noticias/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de PROFISSIONAIS
 * - Incluem validações específicas para gerenciamento de dados profissionais
 */
export const profissionalOperations = {
  /** GET /profissionais - Público pode visualizar */
  list: [],

  /** GET /profissionais/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** POST /profissionais - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody(['nome', 'telefone', 'email', 'especialidade'])
  ],

  /** PUT /profissionais/:id - Apenas admins podem editar */
  update: [...adminOnly, validateUUID('id'), validateRequiredBody([])],

  /** DELETE /profissionais/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de COMENTÁRIOS
 * - Incluem validações específicas para sistema de comentários e moderação
 */
export const comentarioOperations = {
  /** GET /comentarios - Apenas admins podem visualizar */
  list: [...adminOnly],

  /** GET /comentarios/:id - Apenas o autor ou admin podem visualizar */
  view: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.COMENTARIO),
    validateUUID('id')
  ],

  /** GET /comentarios/visiveis - Público pode visualizar comentários visíveis */
  findVisible: [],

  /** POST /comentarios - Apenas usuários autenticados podem criar */
  create: [authMiddleware, validateRequiredBody(['conteudo', 'entidadeId'])],

  /** PUT /comentarios/:id - Apenas o autor ou admin podem editar */
  update: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.COMENTARIO),
    validateUUID('id'),
    validateRequiredBody([])
  ],

  /** DELETE /comentarios/:id - Apenas o autor ou admin podem deletar */
  delete: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.COMENTARIO),
    validateUUID('id')
  ],

  /** GET /comentarios/profissional/:profissionalId - Público pode visualizar comentários de um profissional */
  findByProfessional: [validateUUID('profissionalId')],

  /** GET /comentarios/profissional/:profissionalId/visiveis - Público pode visualizar comentários visíveis */
  findVisibleByProfessional: [validateUUID('profissionalId')],

  /** GET /comentarios/usuario/:usuarioId - Apenas o próprio usuário ou admin podem ver seus comentários */
  findByUser: [authMiddleware, requireSelfOrAdmin, validateUUID('usuarioId')]
}

/**
 * - Middlewares para operações de LIKES
 * - Incluem validações específicas para sistema de likes e reações
 */
export const likeOperations = {
  /** GET /likes/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** PATCH /likes/toggle/:usuarioId/:comentarioId - Apenas usuários autenticados, e apenas para si mesmos */
  toggle: [
    authMiddleware,
    requireSelfLikeAction, // Verifica se o usuário pode dar like por si mesmo
    validateUUID('usuarioId'),
    validateUUID('comentarioId')
  ],

  /** DELETE /likes/:id - Apenas o autor ou admin podem deletar */
  delete: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.LIKE),
    validateUUID('id')
  ],

  /** GET /likes/comentario/:comentarioId - Público pode visualizar likes de um comentário */
  findByComment: [validateUUID('comentarioId')],

  /** GET /likes/usuario/:usuarioId - Apenas o próprio usuário ou admin podem ver seus likes */
  findByUser: [authMiddleware, requireSelfOrAdmin, validateUUID('usuarioId')]
}

/**
 * - Middlewares para operações de AUTENTICAÇÃO
 * - Incluem validações específicas para login e validação de tokens
 */
export const authOperations = {
  /** POST /auth/login - Público pode fazer login */
  login: [validateRequiredBody(['email', 'senha'])],

  /** GET /auth/me - Usuário autenticado pode ver seus dados */
  me: [authMiddleware]
}

/**
 * - Middlewares para operações de MOBILIDADE
 * - Incluem validações específicas para gerenciamento de dados de mobilidade urbana
 */
export const mobilidadeOperations = {
  /** GET /mobilidades - Público pode visualizar */
  list: [],

  /** GET /mobilidades/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** POST /mobilidades - Usuários autenticados podem criar */
  create: [
    authMiddleware,
    validateRequiredBody(['latitude', 'longitude', 'descricao'])
  ],

  /** PUT /mobilidades/:id - Proprietário ou admin podem editar */
  update: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.MOBILIDADE),
    validateUUID('id'),
    validateRequiredBody([])
  ],

  /** DELETE /mobilidades/:id - Proprietário ou admin podem deletar */
  delete: [
    authMiddleware,
    requireOwnershipOrAdmin(TipoRecurso.MOBILIDADE),
    validateUUID('id')
  ],

  /** GET /mobilidades/usuario/:usuarioId - Apenas o próprio usuário ou admin podem ver suas mobilidades */
  findByUser: [authMiddleware, requireSelfOrAdmin, validateUUID('usuarioId')],

  /** GET /mobilidades/status/:status - Público pode visualizar por status */
  findByStatus: []
}

/**
 * - Middlewares para operações de MOTORISTAS
 * - Incluem validações específicas para gerenciamento de dados de motoristas
 */
export const motoristaOperations = {
  /** GET /motoristas - Público pode visualizar */
  list: [],

  /** GET /motoristas/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** POST /motoristas - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody(['nome', 'cpf', 'email', 'telefone'])
  ],

  /** PUT /motoristas/:id - Apenas admins podem editar */
  update: [...adminOnly, validateUUID('id'), validateRequiredBody([])],

  /** DELETE /motoristas/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de VEÍCULOS
 * - Incluem validações específicas para gerenciamento de dados de veículos
 */
export const veiculoOperations = {
  /** GET /veiculos - Público pode visualizar */
  list: [],

  /** GET /veiculos/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** POST /veiculos - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody(['placa', 'marca', 'modelo', 'cor', 'motoristaId'])
  ],

  /** PUT /veiculos/:id - Apenas admins podem editar */
  update: [...adminOnly, validateUUID('id'), validateRequiredBody([])],

  /** DELETE /veiculos/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')]
}

/**
 * - Middlewares para operações de MANUTENÇÕES
 * - Incluem validações específicas para gerenciamento de dados de empresas de manutenção
 */
export const manutencaoOperations = {
  /** GET /manutencoes - Público pode visualizar */
  list: [],

  /** GET /manutencoes/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** POST /manutencoes - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody([
      'nome',
      'telefone',
      'email',
      'especialidades',
      'endereco'
    ])
  ],

  /** PUT /manutencoes/:id - Apenas admins podem editar */
  update: [...adminOnly, validateUUID('id'), validateRequiredBody([])],

  /** DELETE /manutencoes/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')],

  /** GET /manutencoes/email/:email - Apenas admins podem buscar por email */
  findByEmail: [...adminOnly],

  /** GET /manutencoes/especialidade/:especialidade - Público pode buscar por especialidade */
  findByEspecialidade: []
}

/**
 * - Middlewares para operações de ACESSIBILIDADE URBANA
 * - Incluem validações específicas para gerenciamento de dados de acessibilidade urbana
 */
export const acessibilidadeUrbanaOperations = {
  /** GET /acessibilidade-urbana - Público pode visualizar */
  list: [],

  /** GET /acessibilidade-urbana/:id - Público pode visualizar */
  view: [validateUUID('id')],

  /** POST /acessibilidade-urbana - Apenas admins podem criar */
  create: [
    ...adminOnly,
    validateRequiredBody(['nome', 'telefone', 'email', 'categoria', 'endereco'])
  ],

  /** PUT /acessibilidade-urbana/:id - Apenas admins podem editar */
  update: [...adminOnly, validateUUID('id'), validateRequiredBody([])],

  /** DELETE /acessibilidade-urbana/:id - Apenas admins podem deletar */
  delete: [...adminOnly, validateUUID('id')],

  /** GET /acessibilidade-urbana/categoria/:categoria - Público pode visualizar por categoria */
  findByCategoria: [],

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
