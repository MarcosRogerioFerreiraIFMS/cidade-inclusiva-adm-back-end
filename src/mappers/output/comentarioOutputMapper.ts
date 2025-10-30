import type { ComentarioResponseDTO } from '@/dtos/response'
import type { ComentarioCompletions } from '@/types'

/**
 * - Converte entidade Comentario completa para DTO de resposta
 * - Inclui dados do autor e estatísticas de likes
 * @param {ComentarioCompletions} comentario - Entidade comentario completa do banco de dados
 * @returns {ComentarioResponseDTO} DTO formatado para resposta da API
 */
export function toComentarioResponseDTO(
  comentario: ComentarioCompletions
): ComentarioResponseDTO {
  const response: ComentarioResponseDTO = {
    id: comentario.id,
    conteudo: comentario.conteudo,
    visivel: comentario.visivel,
    autor: {
      id: comentario.autor.id,
      nome: comentario.autor.nome,
      email: comentario.autor.email,
      ...(comentario.autor.foto?.url && { fotoUrl: comentario.autor.foto.url })
    },
    criadoEm: comentario.criadoEm,
    atualizadoEm: comentario.atualizadoEm,
    totalLikes: comentario.likesUsuarios.length,
    usuariosQueCurtiram: comentario.likesUsuarios.map((like) => like.usuarioId)
  }

  // Adiciona apenas o campo de entidade que não é null
  if (comentario.profissionalId)
    response.profissionalId = comentario.profissionalId
  if (comentario.motoristaId) response.motoristaId = comentario.motoristaId
  if (comentario.manutencaoId) response.manutencaoId = comentario.manutencaoId
  if (comentario.acessibilidadeUrbanaId)
    response.acessibilidadeUrbanaId = comentario.acessibilidadeUrbanaId

  return response
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
