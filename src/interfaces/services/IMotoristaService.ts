import { MotoristaResponseDTO } from '../../dtos/response/MotoristaResponseDTO'

/**
 * Interface do serviço de motoristas
 * Define os contratos para operações de negócio relacionadas aos motoristas
 */
export interface IMotoristaService {
  /**
   * Cria um novo motorista no sistema
   * @param data - Dados do motorista a ser criado (não validados)
   * @returns Promise com os dados do motorista criado
   */
  create(data: unknown): Promise<MotoristaResponseDTO>

  /**
   * Busca um motorista específico por ID
   * @param id - ID único do motorista
   * @returns Promise com os dados do motorista encontrado
   * @throws Error se o motorista não for encontrado
   */
  findById(id: string): Promise<MotoristaResponseDTO>

  /**
   * Lista todos os motoristas do sistema
   * @returns Promise com array de todos os motoristas
   */
  findAll(): Promise<MotoristaResponseDTO[]>

  /**
   * Atualiza os dados de um motorista existente
   * @param id - ID único do motorista
   * @param data - Dados a serem atualizados (não validados)
   * @returns Promise com os dados do motorista atualizado
   * @throws Error se o motorista não for encontrado
   */
  update(id: string, data: unknown): Promise<MotoristaResponseDTO>

  /**
   * Remove um motorista do sistema
   * @param id - ID único do motorista a ser removido
   * @returns Promise vazia
   * @throws Error se o motorista não for encontrado
   */
  delete(id: string): Promise<void>
}
