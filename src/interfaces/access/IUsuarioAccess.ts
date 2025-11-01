import type { UsuarioCreateDTO } from '@/dtos/create'
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
   * Busca um usuário por telefone
   * @param {string} telefone - Telefone único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  findByTelefone(telefone: string): Promise<UsuarioCompletions | null>

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
   * Lista todos os usuários do banco de dados
   * @returns {Promise<UsuarioCompletions[]>} Lista de usuários com todas as relações
   */
  findAll(): Promise<UsuarioCompletions[]>
}
