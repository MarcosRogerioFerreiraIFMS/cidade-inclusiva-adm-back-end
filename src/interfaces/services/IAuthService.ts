import type { LoginResponseDTO } from '@/dtos/response'

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
   * Valida um token JWT e retorna dados básicos do usuário
   * @param {string} token - Token JWT a ser validado
   * @returns {Promise<{ userId: string; email: string }>} Dados básicos do usuário autenticado
   */
  validateToken(token: string): Promise<{ userId: string; email: string }>
}
