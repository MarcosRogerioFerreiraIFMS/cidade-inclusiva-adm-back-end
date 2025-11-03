import type { VeiculoCreateDTO } from '@/dtos/create'
import type { VeiculoUpdateDTO } from '@/dtos/update'
import type { VeiculoCompletions } from '@/types'

/**
 * Interface de acesso a dados de veículos
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IVeiculoAccess {
  /**
   * Cria um novo veículo
   * @param data - Dados do veículo a ser criado
   * @returns Promise com o veículo criado incluindo relacionamentos
   */
  create(data: VeiculoCreateDTO): Promise<VeiculoCompletions>

  /**
   * Busca um veículo por ID
   * @param id - ID único do veículo
   * @returns Promise com o veículo encontrado ou null se não existir
   */
  findById(id: string): Promise<VeiculoCompletions | null>

  /**
   * Busca um veículo por placa
   * @param placa - Placa do veículo
   * @returns Promise com o veículo encontrado ou null se não existir
   */
  findByPlaca(placa: string): Promise<VeiculoCompletions | null>

  /**
   * Busca um veículo por placa incluindo deletados
   * @param placa - Placa do veículo
   * @returns Promise com o veículo encontrado ou null se não existir
   */
  findByPlacaIncludingDeleted(placa: string): Promise<VeiculoCompletions | null>

  /**
   * Busca um veículo por ID do motorista
   * @param motoristaId - ID do motorista
   * @returns Promise com o veículo encontrado ou null se não existir
   */
  findByMotoristaId(motoristaId: string): Promise<VeiculoCompletions | null>

  /**
   * Lista todos os veículos
   * @returns Promise com array de todos os veículos
   */
  findAll(): Promise<VeiculoCompletions[]>

  /**
   * Atualiza os dados de um veículo
   * @param id - ID único do veículo
   * @param data - Dados a serem atualizados
   * @returns Promise com o veículo atualizado
   */
  update(id: string, data: VeiculoUpdateDTO): Promise<VeiculoCompletions>

  /**
   * Restaura e atualiza um veículo soft-deleted
   * @param id - ID do veículo a ser restaurado e atualizado
   * @param veiculoData - Dados do veículo para atualização
   * @returns Promise com o veículo restaurado e atualizado
   */
  restoreAndUpdate(
    id: string,
    veiculoData: VeiculoCreateDTO
  ): Promise<VeiculoCompletions>

  /**
   * Remove um veículo do sistema
   * @param id - ID único do veículo a ser removido
   * @returns Promise vazia
   */
  delete(id: string): Promise<void>

  /**
   * Restaura um veículo soft-deleted
   * @param id - ID único do veículo a ser restaurado
   * @returns Promise com o veículo restaurado
   */
  restore(id: string): Promise<VeiculoCompletions>
}
