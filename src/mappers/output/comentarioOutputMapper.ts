import { Comentario } from '@prisma/client'
import { ComentarioResponseDTO } from '../../dtos/response/ComentarioResponseDTO'

export function toComentarioResponseDTO(
  comentario: Comentario
): ComentarioResponseDTO {
  return {
    id: comentario.id,
    likes: comentario.likes,
    conteudo: comentario.conteudo,
    visivel: comentario.visivel,
    entidadeId: comentario.entidadeId,
    entidadeTipo: comentario.entidadeTipo,
    criadoEm: comentario.criadoEm,
    atualizadoEm: comentario.atualizadoEm
  }
}

export function toComentariosResponseDTO(
  comentarios: Comentario[]
): ComentarioResponseDTO[] {
  return comentarios.map(toComentarioResponseDTO)
}
