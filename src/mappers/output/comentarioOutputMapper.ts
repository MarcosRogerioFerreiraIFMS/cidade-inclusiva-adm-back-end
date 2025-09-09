import { ComentarioResponseDTO } from '../../dtos/response'
import { ComentarioCompletions } from '../../types'
import { toLikeResponseDTO } from './'

/**
 * - Converte entidade Comentario completa para DTO de resposta
 * - Inclui todos os likes associados ao comentário
 * @param {ComentarioCompletions} comentario - Entidade comentario completa do banco de dados
 * @returns {ComentarioResponseDTO} DTO formatado para resposta da API
 */
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

/**
 * - Converte lista de entidades Comentario para lista de DTOs de resposta
 * - Aplica transformação individual para cada comentário da lista
 * @param {ComentarioCompletions[]} comentarios - Lista de entidades comentario do banco de dados
 * @returns {ComentarioResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toComentariosResponseDTO(
  comentarios: ComentarioCompletions[]
): ComentarioResponseDTO[] {
  return comentarios.map(toComentarioResponseDTO)
}
