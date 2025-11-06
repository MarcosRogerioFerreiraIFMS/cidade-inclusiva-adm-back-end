import type { LikeResponseDTO } from '@/dtos/response'
import type {
  IComentarioAccess,
  ILikeAccess,
  IUsuarioAccess
} from '@/interfaces/access'
import type { ILikeService } from '@/interfaces/services'
import { toLikeResponseDTO, toLikesResponseDTO } from '@/mappers/output'
import type { UsuarioCompletions } from '@/types'
import { throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a likes:
 * - Implementa a interface ILikeService e gerencia operações de like/unlike em comentários
 * - Controla a interação entre usuários e comentários através do sistema de likes
 */
export class LikeService implements ILikeService {
  /**
   * Construtor do serviço de likes
   * @param {ILikeAccess} likeRepository - Repositório para acesso aos dados de likes
   * @param {IUsuarioAccess} usuarioRepository - Repositório para validação de usuários
   * @param {IComentarioAccess} comentarioRepository - Repositório para validação de comentários
   */
  constructor(
    private likeRepository: ILikeAccess,
    private usuarioRepository: IUsuarioAccess,
    private comentarioRepository: IComentarioAccess
  ) {}

  /**
   * Busca um like específico pelo ID:
   * - Valida se o like existe antes de retornar
   * @param {string} id - ID único do like
   * @returns {Promise<LikeResponseDTO>} Dados do like encontrado
   * @throws {HttpError} Erro 404 se o like não for encontrado
   */
  async findById(id: string): Promise<LikeResponseDTO> {
    const like = throwIfNotFound(
      await this.likeRepository.findById(id),
      'Like não encontrado.'
    )

    return toLikeResponseDTO(like)
  }

  /**
   * Alterna o estado de like de um usuário em um comentário (toggle like/unlike):
   * - Se o like existe, remove (unlike). Se não existe, adiciona (like)
   * - Valida a existência do comentário antes da operação
   * - Usa o usuário autenticado para registrar o like
   * - Operação atômica: cria/deleta e conta em sequência garantida
   * @param {string} comentarioId - ID do comentário que está recebendo like/unlike
   * @param {UsuarioCompletions} user - Usuário autenticado
   * @returns {Promise<{liked: boolean, totalLikes: number}>} Estado do like e total de likes no comentário
   * @throws {HttpError} Erro 404 se comentário não for encontrado
   */
  async toggle(
    comentarioId: string,
    user: UsuarioCompletions
  ): Promise<{ liked: boolean; totalLikes: number }> {
    const comentario = await this.comentarioRepository.findById(comentarioId)
    throwIfNotFound(comentario, 'Comentário não encontrado.')

    const usuarioId = user.id

    const existingLike = await this.likeRepository.findByUsuarioAndComentario(
      usuarioId,
      comentarioId
    )

    let liked: boolean

    if (existingLike) {
      // Unlike: remove o like existente e conta após remoção
      await this.likeRepository.deleteByUsuarioAndComentario(
        usuarioId,
        comentarioId
      )
      liked = false
    } else {
      // Like: cria um novo like
      await this.likeRepository.create({ usuarioId, comentarioId })
      liked = true
    }

    // Conta os likes após a operação para garantir consistência
    const totalLikes = await this.likeRepository.countByComentario(comentarioId)

    return { liked, totalLikes }
  }

  /**
   * Remove um like do sistema:
   * - Valida se o like existe antes de remover
   * @param {string} id - ID único do like a ser removido
   * @returns {Promise<void>}
   * @throws {HttpError} Erro 404 se o like não for encontrado
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.likeRepository.findById(id),
      'Like não encontrado.'
    )

    await this.likeRepository.delete(id)
  }

  /**
   * Recupera todos os likes de um comentário específico:
   * - Valida se o comentário existe antes de buscar os likes
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeResponseDTO[]>} Lista de likes do comentário
   * @throws {HttpError} Erro 404 se o comentário não for encontrado
   */
  async findByComentario(comentarioId: string): Promise<LikeResponseDTO[]> {
    throwIfNotFound(
      await this.comentarioRepository.findById(comentarioId),
      'Comentário não encontrado.'
    )

    const likes = await this.likeRepository.findByComentario(comentarioId)
    return toLikesResponseDTO(likes)
  }

  /**
   * Recupera todos os likes dados por um usuário específico:
   * - Valida se o usuário existe antes de buscar os likes
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<LikeResponseDTO[]>} Lista de likes do usuário
   * @throws {HttpError} Erro 404 se o usuário não for encontrado
   */
  async findByUsuario(usuarioId: string): Promise<LikeResponseDTO[]> {
    throwIfNotFound(
      await this.usuarioRepository.findById(usuarioId),
      'Usuário não encontrado.'
    )

    const likes = await this.likeRepository.findByUsuario(usuarioId)
    return toLikesResponseDTO(likes)
  }
}
