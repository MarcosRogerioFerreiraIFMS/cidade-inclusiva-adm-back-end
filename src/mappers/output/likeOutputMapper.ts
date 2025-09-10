import { LikeResponseDTO } from '@/dtos/response'
import { LikeCompletions } from '@/types'

/**
 * - Converte entidade Like completa para DTO de resposta
 * - Transforma dados do banco em formato adequado para API
 * @param {LikeCompletions} like - Entidade like completa do banco de dados
 * @returns {LikeResponseDTO} DTO formatado para resposta da API
 */
export function toLikeResponseDTO(like: LikeCompletions): LikeResponseDTO {
  return {
    id: like.id,
    usuarioId: like.usuarioId,
    comentarioId: like.comentarioId,
    criadoEm: like.criadoEm
  }
}

/**
 * - Converte lista de entidades Like para lista de DTOs de resposta
 * - Aplica transformação individual para cada like da lista
 * @param {LikeCompletions[]} likes - Lista de entidades like do banco de dados
 * @returns {LikeResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toLikesResponseDTO(
  likes: LikeCompletions[]
): LikeResponseDTO[] {
  return likes.map(toLikeResponseDTO)
}
