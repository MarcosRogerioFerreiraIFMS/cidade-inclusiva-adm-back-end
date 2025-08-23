import { ComentarioResponseDTO } from '../../dtos/response/ComentarioResponseDTO'
import { ComentarioCompletions } from '../../types/ComentarioTypes'

import { toLikeResponseDTO } from './likeOutputMapper'

export function toComentarioResponseDTO(
  comentario: ComentarioCompletions
): ComentarioResponseDTO {
  return {
    id: comentario.id,
    conteudo: comentario.conteudo,
    visivel: comentario.visivel,
    usuarioId: comentario.usuarioId,
    profissionalId: comentario.profissionalId!,
    criadoEm: comentario.criadoEm,
    atualizadoEm: comentario.atualizadoEm,
    likes: comentario.likesUsuarios.map((like) => toLikeResponseDTO(like))
  }
}

export function toComentariosResponseDTO(
  comentarios: ComentarioCompletions[]
): ComentarioResponseDTO[] {
  return comentarios.map(toComentarioResponseDTO)
}
