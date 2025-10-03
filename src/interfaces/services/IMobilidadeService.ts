import type { MobilidadeResponseDTO } from '@/dtos/response'
import type { UsuarioCompletions } from '@/types'

/**
 * Interface que define o contrato de serviços para mobilidade
 * Estabelece as operações de negócio que devem ser implementadas
 * pelo serviço de mobilidade
 */
export interface IMobilidadeService {
  /**
   * Cria uma nova mobilidade no sistema
   * @param {unknown} data - Dados da mobilidade a ser criada
   * @param {UsuarioCompletions | undefined} user - Dados completos do usuário autenticado que está criando a mobilidade
   * - O usuário autenticado é obrigatório para criar uma mobilidade
   * @returns {Promise<MobilidadeResponseDTO>} Dados da mobilidade criada
   */
  create(
    data: unknown,
    user: UsuarioCompletions | undefined
  ): Promise<MobilidadeResponseDTO>

  /**
   * Busca uma mobilidade específica pelo ID
   * @param {string} id - ID único da mobilidade
   * @returns {Promise<MobilidadeResponseDTO>} Dados da mobilidade encontrada
   */
  findById(id: string): Promise<MobilidadeResponseDTO>

  /**
   * Atualiza os dados de uma mobilidade existente
   * @param {string} id - ID único da mobilidade a ser atualizada
   * @param {unknown} data - Novos dados da mobilidade
   * @returns {Promise<MobilidadeResponseDTO>} Dados da mobilidade atualizada
   */
  update(id: string, data: unknown): Promise<MobilidadeResponseDTO>

  /**
   * Remove uma mobilidade do sistema
   * @param {string} id - ID único da mobilidade a ser removida
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Recupera todas as mobilidades do sistema
   * @returns {Promise<MobilidadeResponseDTO[]>} Lista de todas as mobilidades
   */
  findAll(): Promise<MobilidadeResponseDTO[]>

  /**
   * Busca mobilidades por usuário
   * @param {string} usuarioId - ID único do usuário
   * @returns {Promise<MobilidadeResponseDTO[]>} Lista de mobilidades do usuário
   */
  findByUsuario(usuarioId: string): Promise<MobilidadeResponseDTO[]>

  /**
   * Busca mobilidades por status
   * @param {string} status - Status das mobilidades
   * @returns {Promise<MobilidadeResponseDTO[]>} Lista de mobilidades com o status especificado
   */
  findByStatus(status: string): Promise<MobilidadeResponseDTO[]>
}
