import { LikeResponseDTO } from '../../dtos/response/LikeResponseDTO'
import { LikeCompletions } from '../../types/LikeTypes'

export function toLikeResponseDTO(like: LikeCompletions): LikeResponseDTO {
  return {
    id: like.id,
    usuarioId: like.usuarioId,
    comentarioId: like.comentarioId,
    criadoEm: like.criadoEm
  }
}

export function toLikesResponseDTO(
  likes: LikeCompletions[]
): LikeResponseDTO[] {
  return likes.map(toLikeResponseDTO)
}
