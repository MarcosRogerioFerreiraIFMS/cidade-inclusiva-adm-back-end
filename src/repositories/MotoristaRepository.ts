import type { MotoristaCreateDTO } from '@/dtos/create'
import type { MotoristaUpdateDTO } from '@/dtos/update'
import type { IMotoristaAccess } from '@/interfaces/access'
import type { MotoristaCompletions } from '@/types'

/**
 * - Repository para operações de motoristas:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * - Responsável por coordenar operações CRUD de motoristas
 */
export class MotoristaRepository implements IMotoristaAccess {
  /** DAO de motoristas injetado para acesso aos dados */
  private dao: IMotoristaAccess

  /**
   * Construtor do repository de motoristas
   * @param {IMotoristaAccess} dao - DAO de motoristas para acesso aos dados
   */
  constructor(dao: IMotoristaAccess) {
    this.dao = dao
  }

  /**
   * Cria um novo motorista
   * @param {MotoristaCreateDTO} data - Dados do motorista a ser criado
   * @returns {Promise<MotoristaCompletions>} Motorista criado com todas as relações
   */
  async create(data: MotoristaCreateDTO): Promise<MotoristaCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca um motorista por ID
   * @param {string} id - ID único do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findById(id: string): Promise<MotoristaCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Busca um motorista por telefone
   * @param {string} telefone - Telefone do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByTelefone(telefone: string): Promise<MotoristaCompletions | null> {
    return await this.dao.findByTelefone(telefone)
  }

  /**
   * Busca um motorista por telefone incluindo deletados
   * @param {string} telefone - Telefone do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<MotoristaCompletions | null> {
    return await this.dao.findByTelefoneIncludingDeleted(telefone)
  }

  /**
   * Busca um motorista por email
   * @param {string} email - Email do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByEmail(email: string): Promise<MotoristaCompletions | null> {
    return await this.dao.findByEmail(email)
  }

  /**
   * Busca um motorista por email incluindo deletados
   * @param {string} email - Email do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<MotoristaCompletions | null> {
    return await this.dao.findByEmailIncludingDeleted(email)
  }

  /**
   * Atualiza os dados de um motorista
   * @param {string} id - ID único do motorista
   * @param {MotoristaUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<MotoristaCompletions>} Motorista atualizado
   */
  async update(
    id: string,
    data: MotoristaUpdateDTO
  ): Promise<MotoristaCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Restaura e atualiza um motorista soft-deleted
   * @param {string} id - ID do motorista a ser restaurado e atualizado
   * @param {MotoristaCreateDTO} motoristaData - Dados do motorista para atualização
   * @returns {Promise<MotoristaCompletions>} Motorista restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    motoristaData: MotoristaCreateDTO
  ): Promise<MotoristaCompletions> {
    return await this.dao.restoreAndUpdate(id, motoristaData)
  }

  /**
   * Remove um motorista do sistema
   * @param {string} id - ID único do motorista a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Restaura um motorista soft-deleted
   * @param {string} id - ID único do motorista a ser restaurado
   * @returns {Promise<MotoristaCompletions>} Motorista restaurado
   */
  async restore(id: string): Promise<MotoristaCompletions> {
    return await this.dao.restore(id)
  }

  /**
   * Lista todos os motoristas do sistema
   * @returns {Promise<MotoristaCompletions[]>} Lista de todos os motoristas
   */
  async findAll(): Promise<MotoristaCompletions[]> {
    return await this.dao.findAll()
  }
}
