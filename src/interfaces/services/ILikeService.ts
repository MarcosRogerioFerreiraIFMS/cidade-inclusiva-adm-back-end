import { LikeResponseDTO } from '../../dtos/response/LikeResponseDTO'

/**
 * Interface para serviço de likes
 * Define os contratos para operações de negócio relacionadas aos likes/curtidas
 */
export interface ILikeService {
  /**
   * Busca like por ID
   * @param {string} id - ID do like
   * @returns {Promise<LikeResponseDTO>} Like encontrado
   */
  findById(id: string): Promise<LikeResponseDTO>

  /**
   * Alterna o estado de like (curtir/descurtir)
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<{liked: boolean; totalLikes: number}>} Estado do like e total
   */
  toggle(
    usuarioId: string,
    comentarioId: string
  ): Promise<{ liked: boolean; totalLikes: number }>

  /**
   * Remove um like
   * @param {string} id - ID do like a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Busca likes de um comentário específico
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeResponseDTO[]>} Likes do comentário
   */
  findByComentario(comentarioId: string): Promise<LikeResponseDTO[]>

  /**
   * Busca likes de um usuário específico
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<LikeResponseDTO[]>} Likes do usuário
   */
  findByUsuario(usuarioId: string): Promise<LikeResponseDTO[]>
}
