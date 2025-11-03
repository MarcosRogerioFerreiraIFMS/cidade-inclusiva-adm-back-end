import type { ProfissionalCreateDTO } from '@/dtos/create'
import type { ProfissionalUpdateDTO } from '@/dtos/update'
import type { IProfissionalAccess } from '@/interfaces/access'
import type { ProfissionalCompletions } from '@/types'

/**
 * - Repository para operações de profissionais:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * - Responsável por coordenar operações CRUD de profissionais com validações de unicidade
 */
export class ProfissionalRepository implements IProfissionalAccess {
  /** DAO de profissionais injetado para acesso aos dados */
  private dao: IProfissionalAccess

  /**
   * Construtor do repository de profissionais
   * @param {IProfissionalAccess} dao - DAO de profissionais para acesso aos dados
   */
  constructor(dao: IProfissionalAccess) {
    this.dao = dao
  }

  /**
   * Cria um novo profissional
   * @param {ProfissionalCreateDTO} data - Dados do profissional a ser criado
   * @returns {Promise<ProfissionalCompletions>} Profissional criado com todas as relações
   */
  async create(data: ProfissionalCreateDTO): Promise<ProfissionalCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca um profissional por ID
   * @param {string} id - ID único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findById(id: string): Promise<ProfissionalCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Busca um profissional por email
   * @param {string} email - Email do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findByEmail(email: string): Promise<ProfissionalCompletions | null> {
    return await this.dao.findByEmail(email)
  }

  /**
   * Busca um profissional por email incluindo deletados
   * @param {string} email - Email do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<ProfissionalCompletions | null> {
    return await this.dao.findByEmailIncludingDeleted(email)
  }

  /**
   * Busca um profissional por telefone
   * @param {string} telefone - Telefone do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findByTelefone(
    telefone: string
  ): Promise<ProfissionalCompletions | null> {
    return await this.dao.findByTelefone(telefone)
  }

  /**
   * Busca um profissional por telefone incluindo deletados
   * @param {string} telefone - Telefone do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<ProfissionalCompletions | null> {
    return await this.dao.findByTelefoneIncludingDeleted(telefone)
  }

  /**
   * Atualiza os dados de um profissional
   * @param {string} id - ID único do profissional
   * @param {ProfissionalUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ProfissionalCompletions>} Profissional atualizado
   */
  async update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Remove um profissional do sistema
   * @param {string} id - ID único do profissional a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Restaura um profissional soft-deleted
   * @param {string} id - ID único do profissional a ser restaurado
   * @returns {Promise<ProfissionalCompletions>} Profissional restaurado
   */
  async restore(id: string): Promise<ProfissionalCompletions> {
    return await this.dao.restore(id)
  }

  /**
   * Restaura e atualiza um profissional soft-deleted com novos dados
   * @param {string} id - ID único do profissional a ser restaurado
   * @param {ProfissionalCreateDTO} data - Novos dados do profissional
   * @returns {Promise<ProfissionalCompletions>} Profissional restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    data: ProfissionalCreateDTO
  ): Promise<ProfissionalCompletions> {
    return await this.dao.restoreAndUpdate(id, data)
  }

  /**
   * Lista todos os profissionais do sistema
   * @returns {Promise<ProfissionalCompletions[]>} Lista de todos os profissionais
   */
  async findAll(): Promise<ProfissionalCompletions[]> {
    return await this.dao.findAll()
  }
}
