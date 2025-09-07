import { VeiculoResponseDTO } from '../../dtos/response/VeiculoResponseDTO'

/**
 * Interface do serviço de veículos
 * Define os contratos para operações de negócio relacionadas aos veículos
 */
export interface IVeiculoService {
  /**
   * Cria um novo veículo no sistema
   * @param data - Dados do veículo a ser criado (não validados)
   * @returns Promise com os dados do veículo criado
   */
  create(data: unknown): Promise<VeiculoResponseDTO>

  /**
   * Busca um veículo específico por ID
   * @param id - ID único do veículo
   * @returns Promise com os dados do veículo encontrado
   * @throws Error se o veículo não for encontrado
   */
  findById(id: string): Promise<VeiculoResponseDTO>

  /**
   * Lista todos os veículos do sistema
   * @returns Promise com array de todos os veículos
   */
  findAll(): Promise<VeiculoResponseDTO[]>

  /**
   * Atualiza os dados de um veículo existente
   * @param id - ID único do veículo
   * @param data - Dados a serem atualizados (não validados)
   * @returns Promise com os dados do veículo atualizado
   * @throws Error se o veículo não for encontrado
   */
  update(id: string, data: unknown): Promise<VeiculoResponseDTO>

  /**
   * Remove um veículo do sistema
   * @param id - ID único do veículo a ser removido
   * @returns Promise vazia
   * @throws Error se o veículo não for encontrado
   */
  delete(id: string): Promise<void>
}
