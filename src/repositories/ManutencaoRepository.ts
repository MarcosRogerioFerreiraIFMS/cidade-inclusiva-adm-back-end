import type { ManutencaoCreateDTO } from '@/dtos/create'
import type { ManutencaoUpdateDTO } from '@/dtos/update'
import type { IManutencaoAccess } from '@/interfaces/access'
import type { ManutencaoCompletions } from '@/types'

/**
 * Repository para operações de manutenções:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 */
export class ManutencaoRepository implements IManutencaoAccess {
  /** DAO de manutenções injetado para acesso aos dados */
  private dao: IManutencaoAccess

  /**
   * @param {IManutencaoAccess} dao - DAO de manutenções para acesso aos dados
   */
  constructor(dao: IManutencaoAccess) {
    this.dao = dao
  }

  /**
   * Cria uma nova manutenção
   * @param {ManutencaoCreateDTO} data - Dados da manutenção a ser criada
   * @returns {Promise<ManutencaoCompletions>} Manutenção criada com todas as relações
   */
  async create(data: ManutencaoCreateDTO): Promise<ManutencaoCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca uma manutenção por ID
   * @param {string} id - ID único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findById(id: string): Promise<ManutencaoCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Busca uma manutenção por email
   * @param {string} email - Email da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByEmail(email: string): Promise<ManutencaoCompletions | null> {
    return await this.dao.findByEmail(email)
  }

  /**
   * Busca uma manutenção por email incluindo deletados
   * @param {string} email - Email da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<ManutencaoCompletions | null> {
    return await this.dao.findByEmailIncludingDeleted(email)
  }

  /**
   * Busca uma manutenção por telefone
   * @param {string} telefone - Telefone da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByTelefone(
    telefone: string
  ): Promise<ManutencaoCompletions | null> {
    return await this.dao.findByTelefone(telefone)
  }

  /**
   * Busca uma manutenção por telefone incluindo deletados
   * @param {string} telefone - Telefone da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<ManutencaoCompletions | null> {
    return await this.dao.findByTelefoneIncludingDeleted(telefone)
  }

  /**
   * Atualiza os dados de uma manutenção
   * @param {string} id - ID único da manutenção
   * @param {ManutencaoUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ManutencaoCompletions>} Manutenção atualizada
   */
  async update(
    id: string,
    data: ManutencaoUpdateDTO
  ): Promise<ManutencaoCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Restaura e atualiza uma manutenção soft-deleted
   * @param {string} id - ID da manutenção a ser restaurada e atualizada
   * @param {ManutencaoCreateDTO} manutencaoData - Dados da manutenção para atualização
   * @returns {Promise<ManutencaoCompletions>} Manutenção restaurada e atualizada
   */
  async restoreAndUpdate(
    id: string,
    manutencaoData: ManutencaoCreateDTO
  ): Promise<ManutencaoCompletions> {
    return await this.dao.restoreAndUpdate(id, manutencaoData)
  }

  /**
   * Remove uma manutenção do sistema
   * @param {string} id - ID único da manutenção a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Restaura uma manutenção soft-deleted
   * @param {string} id - ID único da manutenção a ser restaurada
   * @returns {Promise<ManutencaoCompletions>} Manutenção restaurada
   */
  async restore(id: string): Promise<ManutencaoCompletions> {
    return await this.dao.restore(id)
  }

  /**
   * Lista todas as manutenções do sistema
   * @returns {Promise<ManutencaoCompletions[]>} Lista de todas as manutenções
   */
  async findAll(): Promise<ManutencaoCompletions[]> {
    return await this.dao.findAll()
  }

  /**
   * Busca manutenções por especialidade
   * @param {string} especialidade - Nome da especialidade
   * @returns {Promise<ManutencaoCompletions[]>} Lista de manutenções com a especialidade
   */
  async findByEspecialidade(
    especialidade: string
  ): Promise<ManutencaoCompletions[]> {
    return await this.dao.findByEspecialidade(especialidade)
  }
}
