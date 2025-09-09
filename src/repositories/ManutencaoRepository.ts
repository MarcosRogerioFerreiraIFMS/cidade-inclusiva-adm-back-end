import { ManutencaoCreateDTO } from '../dtos/create'
import { ManutencaoUpdateDTO } from '../dtos/update'
import { IManutencaoAccess } from '../interfaces/access'
import { ManutencaoCompletions } from '../types'

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
   * Remove uma manutenção do sistema
   * @param {string} id - ID único da manutenção a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
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
