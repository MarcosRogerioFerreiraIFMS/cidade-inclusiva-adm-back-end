import type { VeiculoCreateDTO } from '@/dtos/create'
import type { VeiculoUpdateDTO } from '@/dtos/update'
import type { IVeiculoAccess } from '@/interfaces/access'
import type { VeiculoCompletions } from '@/types'

/**
 * - Repository para operações de veículos:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * - Responsável por coordenar operações CRUD de veículos
 */
export class VeiculoRepository implements IVeiculoAccess {
  /** DAO de veículos injetado para acesso aos dados */
  private dao: IVeiculoAccess

  /**
   * Construtor do repository de veículos
   * @param {IVeiculoAccess} dao - DAO de veículos para acesso aos dados
   */
  constructor(dao: IVeiculoAccess) {
    this.dao = dao
  }

  /**
   * Cria um novo veículo
   * @param {VeiculoCreateDTO} data - Dados do veículo a ser criado
   * @returns {Promise<VeiculoCompletions>} Veículo criado com todas as relações
   */
  async create(data: VeiculoCreateDTO): Promise<VeiculoCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca um veículo por ID
   * @param {string} id - ID único do veículo
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findById(id: string): Promise<VeiculoCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Busca um veículo por placa
   * @param {string} placa - Placa do veículo
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findByPlaca(placa: string): Promise<VeiculoCompletions | null> {
    return await this.dao.findByPlaca(placa)
  }

  /**
   * Busca um veículo por placa incluindo deletados
   * @param {string} placa - Placa do veículo
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findByPlacaIncludingDeleted(
    placa: string
  ): Promise<VeiculoCompletions | null> {
    return await this.dao.findByPlacaIncludingDeleted(placa)
  }

  /**
   * Busca um veículo por ID do motorista
   * @param {string} motoristaId - ID do motorista
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findByMotoristaId(
    motoristaId: string
  ): Promise<VeiculoCompletions | null> {
    return await this.dao.findByMotoristaId(motoristaId)
  }

  /**
   * Atualiza os dados de um veículo
   * @param {string} id - ID único do veículo
   * @param {VeiculoUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<VeiculoCompletions>} Veículo atualizado
   */
  async update(
    id: string,
    data: VeiculoUpdateDTO
  ): Promise<VeiculoCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Restaura e atualiza um veículo soft-deleted
   * @param {string} id - ID do veículo a ser restaurado e atualizado
   * @param {VeiculoCreateDTO} veiculoData - Dados do veículo para atualização
   * @returns {Promise<VeiculoCompletions>} Veículo restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    veiculoData: VeiculoCreateDTO
  ): Promise<VeiculoCompletions> {
    return await this.dao.restoreAndUpdate(id, veiculoData)
  }

  /**
   * Remove um veículo do sistema
   * @param {string} id - ID único do veículo a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Restaura um veículo soft-deleted
   * @param {string} id - ID único do veículo a ser restaurado
   * @returns {Promise<VeiculoCompletions>} Veículo restaurado
   */
  async restore(id: string): Promise<VeiculoCompletions> {
    return await this.dao.restore(id)
  }

  /**
   * Lista todos os veículos do sistema
   * @returns {Promise<VeiculoCompletions[]>} Lista de todos os veículos
   */
  async findAll(): Promise<VeiculoCompletions[]> {
    return await this.dao.findAll()
  }
}
