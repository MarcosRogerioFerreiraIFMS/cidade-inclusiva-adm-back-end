import { UsuarioResponseDTO } from '../../dtos/response/UsuarioResponseDTO'

/**
 * Interface do serviço de usuários
 * Define os contratos para operações CRUD e consultas específicas de usuários
 */
export interface IUsuarioService {
  /**
   * Cria um novo usuário no sistema
   * @param {unknown} data - Dados não tipados do usuário
   * @returns {Promise<UsuarioResponseDTO>} Usuário criado formatado para resposta
   */
  create(data: unknown): Promise<UsuarioResponseDTO>

  /**
   * Busca um usuário por ID
   * @param {string} id - ID único do usuário
   * @returns {Promise<UsuarioResponseDTO>} Usuário encontrado
   */
  findById(id: string): Promise<UsuarioResponseDTO>

  /**
   * Busca um usuário por email
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioResponseDTO>} Usuário encontrado
   */
  findByEmail(email: string): Promise<UsuarioResponseDTO>

  /**
   * Atualiza os dados de um usuário existente
   * @param {string} id - ID único do usuário
   * @param {unknown} data - Dados não tipados de atualização
   * @returns {Promise<UsuarioResponseDTO>} Usuário atualizado
   */
  update(id: string, data: unknown): Promise<UsuarioResponseDTO>

  /**
   * Remove um usuário do sistema
   * @param {string} id - ID único do usuário
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todos os usuários do sistema
   * @returns {Promise<UsuarioResponseDTO[]>} Lista de usuários
   */
  findAll(): Promise<UsuarioResponseDTO[]>
}
