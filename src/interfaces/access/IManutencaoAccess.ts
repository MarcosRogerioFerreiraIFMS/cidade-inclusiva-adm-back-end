import type { ManutencaoCreateDTO } from '@/dtos/create'
import type { ManutencaoUpdateDTO } from '@/dtos/update'
import type { ManutencaoCompletions } from '@/types'

/**
 * Interface de acesso a dados de manutenções
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IManutencaoAccess {
  /**
   * Cria uma nova manutenção no banco de dados
   * @param {ManutencaoCreateDTO} data - Dados validados da manutenção
   * @returns {Promise<ManutencaoCompletions>} Manutenção criada com todas as relações
   */
  create(data: ManutencaoCreateDTO): Promise<ManutencaoCompletions>

  /**
   * Busca uma manutenção por ID
   * @param {string} id - ID único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  findById(id: string): Promise<ManutencaoCompletions | null>

  /**
   * Busca uma manutenção por email
   * @param {string} email - Email único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  findByEmail(email: string): Promise<ManutencaoCompletions | null>

  /**
   * Busca uma manutenção por telefone
   * @param {string} telefone - Telefone único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  findByTelefone(telefone: string): Promise<ManutencaoCompletions | null>

  /**
   * Atualiza os dados de uma manutenção no banco de dados
   * @param {string} id - ID único da manutenção
   * @param {ManutencaoUpdateDTO} data - Dados validados de atualização
   * @returns {Promise<ManutencaoCompletions>} Manutenção atualizada com todas as relações
   */
  update(id: string, data: ManutencaoUpdateDTO): Promise<ManutencaoCompletions>

  /**
   * Remove uma manutenção do banco de dados
   * @param {string} id - ID único da manutenção
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todas as manutenções do banco de dados
   * @returns {Promise<ManutencaoCompletions[]>} Lista de manutenções com todas as relações
   */
  findAll(): Promise<ManutencaoCompletions[]>

  /**
   * Busca manutenções por especialidade
   * @param {string} especialidade - Nome da especialidade
   * @returns {Promise<ManutencaoCompletions[]>} Lista de manutenções com a especialidade
   */
  findByEspecialidade(especialidade: string): Promise<ManutencaoCompletions[]>
}
