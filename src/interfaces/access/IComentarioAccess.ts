import type { ComentarioCreateRelationalDTO } from '@/dtos/create'
import type { ComentarioUpdateDTO } from '@/dtos/update'
import type { ComentarioCompletions } from '@/types'

/**
 * Interface de acesso a dados de comentários
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IComentarioAccess {
  /**
   * Cria um novo comentário no banco de dados
   * @param {ComentarioCreateRelationalDTO} data - Dados do comentário
   * @returns {Promise<ComentarioCompletions>} Comentário criado
   */
  create(data: ComentarioCreateRelationalDTO): Promise<ComentarioCompletions>

  /**
   * Busca comentário por ID
   * @param {string} id - ID do comentário
   * @returns {Promise<ComentarioCompletions | null>} Comentário ou null se não encontrado
   */
  findById(id: string): Promise<ComentarioCompletions | null>

  /**
   * Atualiza dados de um comentário
   * @param {string} id - ID do comentário
   * @param {ComentarioUpdateDTO} data - Dados para atualização
   * @returns {Promise<ComentarioCompletions>} Comentário atualizado
   */
  update(id: string, data: ComentarioUpdateDTO): Promise<ComentarioCompletions>

  /**
   * Remove um comentário do banco de dados
   * @param {string} id - ID do comentário a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Restaura um comentário soft-deleted
   * @param {string} id - ID do comentário a ser restaurado
   * @returns {Promise<ComentarioCompletions>} Comentário restaurado
   */
  restore(id: string): Promise<ComentarioCompletions>

  /**
   * Verifica se um usuário é dono de um comentário específico
   * @param {string} commentId - ID do comentário
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} True se o usuário é dono do comentário
   */
  isCommentOwner(commentId: string, userId: string): Promise<boolean>

  /**
   * Busca todos os comentários de um profissional
   * @param {string} profissionalId - ID do profissional
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  findByProfissionalId(
    profissionalId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]>

  /**
   * Busca todos os comentários de um motorista
   * @param {string} motoristaId - ID do motorista
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  findByMotoristaId(
    motoristaId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]>

  /**
   * Busca todos os comentários de uma manutenção
   * @param {string} manutencaoId - ID da manutenção
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  findByManutencaoId(
    manutencaoId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]>

  /**
   * Busca todos os comentários de uma acessibilidade urbana
   * @param {string} acessibilidadeUrbanaId - ID da acessibilidade urbana
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  findByAcessibilidadeUrbanaId(
    acessibilidadeUrbanaId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]>

  /**
   * Busca todos os comentários feitos por um usuário
   * @param {string} usuarioId - ID do usuário
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  findByUsuarioId(
    usuarioId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]>
}
