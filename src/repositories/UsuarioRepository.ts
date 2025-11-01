import type { UsuarioCreateDTO } from '@/dtos/create'
import type { UsuarioUpdateDTO } from '@/dtos/update'
import type { IUsuarioAccess } from '@/interfaces/access'
import type { UsuarioCompletions } from '@/types'

/**
 * Repository para operações de usuários:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 */
export class UsuarioRepository implements IUsuarioAccess {
  /** DAO de usuários injetado para acesso aos dados */
  private dao: IUsuarioAccess

  /**
   * @param {IUsuarioAccess} dao - DAO de usuários para acesso aos dados
   */
  constructor(dao: IUsuarioAccess) {
    this.dao = dao
  }

  /**
   * Cria um novo usuário
   * @param {UsuarioCreateDTO} data - Dados do usuário a ser criado
   * @returns {Promise<UsuarioCompletions>} Usuário criado com todas as relações
   */
  async create(data: UsuarioCreateDTO): Promise<UsuarioCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca um usuário por ID
   * @param {string} id - ID único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findById(id: string): Promise<UsuarioCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Busca um usuário por email
   * @param {string} email - Email do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<UsuarioCompletions | null> {
    return await this.dao.findByEmail(email)
  }

  /**
   * Busca um usuário por telefone
   * @param {string} telefone - Telefone do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByTelefone(telefone: string): Promise<UsuarioCompletions | null> {
    return await this.dao.findByTelefone(telefone)
  }

  /**
   * Atualiza os dados de um usuário
   * @param {string} id - ID único do usuário
   * @param {UsuarioUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<UsuarioCompletions>} Usuário atualizado
   */
  async update(
    id: string,
    data: UsuarioUpdateDTO
  ): Promise<UsuarioCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Remove um usuário do sistema
   * @param {string} id - ID único do usuário a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Restaura um usuário soft-deleted
   * @param {string} id - ID único do usuário a ser restaurado
   * @returns {Promise<UsuarioCompletions>} Usuário restaurado
   */
  async restore(id: string): Promise<UsuarioCompletions> {
    return await this.dao.restore(id)
  }

  /**
   * Lista todos os usuários do sistema
   * @returns {Promise<UsuarioCompletions[]>} Lista de todos os usuários
   */
  async findAll(): Promise<UsuarioCompletions[]> {
    return await this.dao.findAll()
  }
}
