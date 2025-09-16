import type { ProfissionalResponseDTO } from '@/dtos/response'

/**
 * Interface para serviço de profissionais
 * Define os contratos para operações de negócio relacionadas aos profissionais
 */
export interface IProfissionalService {
  /**
   * Cria um novo profissional
   * @param {unknown} data - Dados do profissional a ser criado
   * @returns {Promise<ProfissionalResponseDTO>} Profissional criado
   */
  create(data: unknown): Promise<ProfissionalResponseDTO>

  /**
   * Busca profissional por ID
   * @param {string} id - ID do profissional
   * @returns {Promise<ProfissionalResponseDTO>} Profissional encontrado
   */
  findById(id: string): Promise<ProfissionalResponseDTO>

  /**
   * Atualiza um profissional existente
   * @param {string} id - ID do profissional
   * @param {unknown} data - Dados para atualização
   * @returns {Promise<ProfissionalResponseDTO>} Profissional atualizado
   */
  update(id: string, data: unknown): Promise<ProfissionalResponseDTO>

  /**
   * Remove um profissional
   * @param {string} id - ID do profissional a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todos os profissionais
   * @returns {Promise<ProfissionalResponseDTO[]>} Lista de profissionais
   */
  findAll(): Promise<ProfissionalResponseDTO[]>
}
