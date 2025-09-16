import type { LikeCreateDTO } from '@/dtos/create'
import type { LikeCompletions } from '@/types'

/**
 * Interface de acesso a dados de likes
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface ILikeAccess {
  /**
   * Cria um novo like no banco de dados
   * @param {LikeCreateDTO} data - Dados do like
   * @returns {Promise<LikeCompletions>} Like criado
   */
  create(data: LikeCreateDTO): Promise<LikeCompletions>

  /**
   * Busca like por ID
   * @param {string} id - ID do like
   * @returns {Promise<LikeCompletions | null>} Like ou null se não encontrado
   */
  findById(id: string): Promise<LikeCompletions | null>

  /**
   * Busca like específico de um usuário em um comentário
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeCompletions | null>} Like ou null se não encontrado
   */
  findByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<LikeCompletions | null>

  /**
   * Remove um like por ID
   * @param {string} id - ID do like a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Remove like específico de usuário em comentário
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<void>}
   */
  deleteByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<void>

  /**
   * Busca todos os likes de um comentário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeCompletions[]>} Lista de likes do comentário
   */
  findByComentario(comentarioId: string): Promise<LikeCompletions[]>

  /**
   * Busca todos os likes de um usuário
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<LikeCompletions[]>} Lista de likes do usuário
   */
  findByUsuario(usuarioId: string): Promise<LikeCompletions[]>

  /**
   * Conta total de likes de um comentário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<number>} Número total de likes
   */
  countByComentario(comentarioId: string): Promise<number>

  /**
   * Verifica se um usuário é dono de um like específico
   * @param {string} likeId - ID do like
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} True se o usuário é dono do like
   */
  isLikeOwner(likeId: string, userId: string): Promise<boolean>
}
