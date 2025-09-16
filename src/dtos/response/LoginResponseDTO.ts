import type { UsuarioResponseDTO } from './UsuarioResponseDTO'

/**
 * - DTO de resposta para operações de login
 * - Contém o token de autenticação e os dados do usuário logado
 */
export interface LoginResponseDTO {
  /** Token JWT para autenticação nas próximas requisições */
  token: string
  /** Dados do usuário autenticado */
  usuario: UsuarioResponseDTO
}
