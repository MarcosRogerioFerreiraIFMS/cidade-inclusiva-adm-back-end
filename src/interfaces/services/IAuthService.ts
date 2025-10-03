import type { LoginResponseDTO, UsuarioResponseDTO } from '@/dtos/response'
import type { UsuarioCompletions } from '@/types'

/**
 * Interface do serviço de autenticação
 * Define os contratos para operações de login e validação de token
 */
export interface IAuthService {
  /**
   * Autentica um usuário com email e senha
   * @param {unknown} loginData - Dados de login não tipados
   * @returns {Promise<LoginResponseDTO>} Token de acesso e dados do usuário
   */
  login(loginData: unknown): Promise<LoginResponseDTO>

  /**
   * Valida um token JWT e retorna os dados do usuário autenticado
   * @param {UsuarioCompletions | undefined} user - Dados completos do usuário autenticado
   * @returns {Promise<UsuarioResponseDTO>} Dados do usuário autenticado
   */
  me(user: UsuarioCompletions | undefined): UsuarioResponseDTO
}
