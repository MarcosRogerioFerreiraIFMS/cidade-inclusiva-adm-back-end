/**
 * - DTO (Data Transfer Object) de resposta para like
 * - Define a estrutura dos dados de like retornados pela API
 * - Representa a relação entre usuário e comentário
 */
export interface LikeResponseDTO {
  /** ID único do like */
  id: string
  /** ID do usuário que deu o like */
  usuarioId: string
  /** ID do comentário que recebeu o like */
  comentarioId: string
  /** Data e hora de criação do like */
  criadoEm: Date
}
