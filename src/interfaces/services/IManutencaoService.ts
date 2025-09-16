import type { ManutencaoResponseDTO } from '@/dtos/response'

/**
 * Interface de serviço de manutenções
 * Define os contratos para as operações de negócio da aplicação
 */
export interface IManutencaoService {
  /**
   * Cria uma nova manutenção no sistema:
   * - Valida unicidade de email e telefone antes da criação
   * @param {unknown} data - Dados não tipados da manutenção vindos da requisição
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção criada formatada para resposta
   * @throws {HttpError} Quando email ou telefone já existem
   */
  create(data: unknown): Promise<ManutencaoResponseDTO>

  /**
   * Busca uma manutenção por ID
   * @param {string} id - ID único da manutenção
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção encontrada formatada para resposta
   * @throws {HttpError} Quando a manutenção não é encontrada
   */
  findById(id: string): Promise<ManutencaoResponseDTO>

  /**
   * Busca uma manutenção por email
   * @param {string} email - Email único da manutenção
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção encontrada formatada para resposta
   * @throws {HttpError} Quando a manutenção não é encontrada
   */
  findByEmail(email: string): Promise<ManutencaoResponseDTO>

  /**
   * Atualiza os dados de uma manutenção existente:
   * - Valida se novos email/telefone não conflitam com outras manutenções
   * @param {string} id - ID único da manutenção
   * @param {unknown} data - Dados não tipados de atualização
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção atualizada formatada para resposta
   * @throws {HttpError} Quando a manutenção não existe ou há conflito de dados
   */
  update(id: string, data: unknown): Promise<ManutencaoResponseDTO>

  /**
   * Remove uma manutenção do sistema
   * @param {string} id - ID único da manutenção a ser removida
   * @returns {Promise<void>}
   * @throws {HttpError} Quando a manutenção não é encontrada
   */
  delete(id: string): Promise<void>

  /**
   * Lista todas as manutenções do sistema
   * @returns {Promise<ManutencaoResponseDTO[]>} Lista de manutenções formatada para resposta
   */
  findAll(): Promise<ManutencaoResponseDTO[]>

  /**
   * Busca manutenções por especialidade
   * @param {string} especialidade - Nome da especialidade
   * @returns {Promise<ManutencaoResponseDTO[]>} Lista de manutenções com a especialidade
   */
  findByEspecialidade(especialidade: string): Promise<ManutencaoResponseDTO[]>
}
