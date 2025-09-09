import { LikeResponseDTO } from './'

/**
 * - DTO (Data Transfer Object) de resposta para comentário
 * - Define a estrutura dos dados de comentário retornados pela API
 * - Inclui relacionamento com likes associados
 */
export interface ComentarioResponseDTO {
  /** ID único do comentário */
  id: string
  /** Conteúdo do comentário */
  conteudo: string
  /** Indica se o comentário está visível publicamente */
  visivel: boolean
  /** ID do usuário que criou o comentário */
  usuarioId: string
  /** ID do profissional associado ao comentário (opcional) */
  profissionalId?: string
  /** Data e hora de criação do comentário */
  criadoEm: Date
  /** Data e hora da última atualização */
  atualizadoEm: Date
  /** Lista de likes associados ao comentário */
  likes: LikeResponseDTO[]
}
