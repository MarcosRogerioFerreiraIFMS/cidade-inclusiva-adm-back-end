import type { AdminCreateDTO, UsuarioCreateDTO } from '@/dtos/create'
import type { UsuarioUpdateDTO } from '@/dtos/update'
import type { UsuarioCompletions } from '@/types'

/**
 * Interface de acesso a dados de usuários
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IUsuarioAccess {
  /**
   * Cria um novo usuário no banco de dados
   * @param {UsuarioCreateDTO} data - Dados validados do usuário
   * @returns {Promise<UsuarioCompletions>} Usuário criado com todas as relações
   */
  create(data: UsuarioCreateDTO): Promise<UsuarioCompletions>

  /**
   * Cria um novo administrador no banco de dados
   * @param {AdminCreateDTO} data - Dados validados do administrador
   * @returns {Promise<UsuarioCompletions>} Administrador criado com todas as relações
   */
  createAdmin(data: AdminCreateDTO): Promise<UsuarioCompletions>

  /**
   * Busca um usuário por ID
   * @param {string} id - ID único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  findById(id: string): Promise<UsuarioCompletions | null>

  /**
   * Busca um usuário por email
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  findByEmail(email: string): Promise<UsuarioCompletions | null>

  /**
   * Busca um usuário por email incluindo deletados
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  findByEmailIncludingDeleted(email: string): Promise<UsuarioCompletions | null>

  /**
   * Busca um usuário por telefone
   * @param {string} telefone - Telefone único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  findByTelefone(telefone: string): Promise<UsuarioCompletions | null>

  /**
   * Busca um usuário por telefone incluindo deletados
   * @param {string} telefone - Telefone único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<UsuarioCompletions | null>

  /**
   * Atualiza os dados de um usuário no banco de dados
   * @param {string} id - ID único do usuário
   * @param {UsuarioUpdateDTO} data - Dados validados de atualização
   * @returns {Promise<UsuarioCompletions>} Usuário atualizado com todas as relações
   */
  update(id: string, data: UsuarioUpdateDTO): Promise<UsuarioCompletions>

  /**
   * Remove um usuário do banco de dados
   * @param {string} id - ID único do usuário
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Restaura um usuário soft-deleted
   * @param {string} id - ID único do usuário a ser restaurado
   * @returns {Promise<UsuarioCompletions>} Usuário restaurado
   */
  restore(id: string): Promise<UsuarioCompletions>

  /**
   * Restaura e atualiza um usuário soft-deleted com novos dados
   * @param {string} id - ID único do usuário a ser restaurado
   * @param {UsuarioCreateDTO} data - Novos dados do usuário
   * @returns {Promise<UsuarioCompletions>} Usuário restaurado e atualizado
   */
  restoreAndUpdate(
    id: string,
    data: UsuarioCreateDTO
  ): Promise<UsuarioCompletions>

  /**
   * Restaura e atualiza um administrador soft-deleted com novos dados
   * @param {string} id - ID único do administrador a ser restaurado
   * @param {AdminCreateDTO} data - Novos dados do administrador
   * @returns {Promise<UsuarioCompletions>} Administrador restaurado e atualizado
   */
  restoreAndUpdateAdmin(
    id: string,
    data: AdminCreateDTO
  ): Promise<UsuarioCompletions>

  /**
   * Lista todos os usuários do banco de dados
   * @returns {Promise<UsuarioCompletions[]>} Lista de usuários com todas as relações
   */
  findAll(): Promise<UsuarioCompletions[]>

  /**
   * Conta quantos administradores ativos existem no sistema
   * @returns {Promise<number>} Número de administradores ativos
   */
  countActiveAdmins(): Promise<number>
}
