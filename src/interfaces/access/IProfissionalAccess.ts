import { ProfissionalCreateDTO } from '../../dtos/create'
import { ProfissionalUpdateDTO } from '../../dtos/update'
import { ProfissionalCompletions } from '../../types'

/**
 * Interface de acesso a dados de profissionais
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IProfissionalAccess {
  /**
   * Cria um novo profissional no banco de dados
   * @param {ProfissionalCreateDTO} data - Dados do profissional
   * @returns {Promise<ProfissionalCompletions>} Profissional criado
   */
  create(data: ProfissionalCreateDTO): Promise<ProfissionalCompletions>

  /**
   * Busca profissional por ID
   * @param {string} id - ID do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional ou null se não encontrado
   */
  findById(id: string): Promise<ProfissionalCompletions | null>

  /**
   * Busca profissional por email
   * @param {string} email - Email do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional ou null se não encontrado
   */
  findByEmail(email: string): Promise<ProfissionalCompletions | null>

  /**
   * Busca profissional por telefone
   * @param {string} telefone - Telefone do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional ou null se não encontrado
   */
  findByTelefone(telefone: string): Promise<ProfissionalCompletions | null>

  /**
   * Atualiza dados de um profissional
   * @param {string} id - ID do profissional
   * @param {ProfissionalUpdateDTO} data - Dados para atualização
   * @returns {Promise<ProfissionalCompletions>} Profissional atualizado
   */
  update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions>

  /**
   * Remove um profissional do banco de dados
   * @param {string} id - ID do profissional a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todos os profissionais
   * @returns {Promise<ProfissionalCompletions[]>} Lista de profissionais
   */
  findAll(): Promise<ProfissionalCompletions[]>
}
