import type { LoginResponseDTO, UsuarioResponseDTO } from '@/dtos/response'
import type { JWTPayload } from '@/utils'

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
   * @param {JWTPayload | undefined} user - Payload do token JWT
   * @returns {Promise<{ userId: string; email: string }>} Dados do usuário autenticado
   */
  me(user: JWTPayload | undefined): Promise<UsuarioResponseDTO>
}
