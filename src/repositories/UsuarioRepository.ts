import type { AdminCreateDTO, UsuarioCreateDTO } from '@/dtos/create'
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
   * Cria um novo administrador
   * @param {AdminCreateDTO} data - Dados do administrador a ser criado
   * @returns {Promise<UsuarioCompletions>} Administrador criado com todas as relações
   */
  async createAdmin(data: AdminCreateDTO): Promise<UsuarioCompletions> {
    return await this.dao.createAdmin(data)
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
   * Busca um usuário por email incluindo deletados
   * @param {string} email - Email do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<UsuarioCompletions | null> {
    return await this.dao.findByEmailIncludingDeleted(email)
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
   * Busca um usuário por telefone incluindo deletados
   * @param {string} telefone - Telefone do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<UsuarioCompletions | null> {
    return await this.dao.findByTelefoneIncludingDeleted(telefone)
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
   * Restaura e atualiza um usuário soft-deleted com novos dados
   * @param {string} id - ID único do usuário a ser restaurado
   * @param {UsuarioCreateDTO} data - Novos dados do usuário
   * @returns {Promise<UsuarioCompletions>} Usuário restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    data: UsuarioCreateDTO
  ): Promise<UsuarioCompletions> {
    return await this.dao.restoreAndUpdate(id, data)
  }

  /**
   * Restaura e atualiza um administrador soft-deleted com novos dados
   * @param {string} id - ID único do administrador a ser restaurado
   * @param {AdminCreateDTO} data - Novos dados do administrador
   * @returns {Promise<UsuarioCompletions>} Administrador restaurado e atualizado
   */
  async restoreAndUpdateAdmin(
    id: string,
    data: AdminCreateDTO
  ): Promise<UsuarioCompletions> {
    return await this.dao.restoreAndUpdateAdmin(id, data)
  }

  /**
   * Lista todos os usuários do sistema
   * @returns {Promise<UsuarioCompletions[]>} Lista de todos os usuários
   */
  async findAll(): Promise<UsuarioCompletions[]> {
    return await this.dao.findAll()
  }
}
