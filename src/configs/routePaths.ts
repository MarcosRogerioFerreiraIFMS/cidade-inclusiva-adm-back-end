/**
 * Configuração centralizada de caminhos das rotas da API:
 * - Define os prefixos base para cada grupo de endpoints
 * @constant {Object}
 */
export const ROUTES = {
  /** Rotas para operações de notícias */
  NOTICIA: '/noticias',
  /** Rotas para operações de profissionais */
  PROFISSIONAL: '/profissionais',
  /** Rotas para operações de comentários */
  COMENTARIO: '/comentarios',
  /** Rotas para operações de usuários */
  USUARIO: '/usuarios',
  /** Rotas para operações de likes */
  LIKE: '/likes',
  /** Rotas para operações de autenticação */
  AUTH: '/auth',
  /** Rotas para operações de auditoria */
  AUDIT: '/audit'
} as const
