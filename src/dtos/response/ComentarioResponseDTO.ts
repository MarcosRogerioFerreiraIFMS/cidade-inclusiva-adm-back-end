/**
 * - DTO (Data Transfer Object) de resposta para comentário
 * - Define a estrutura dos dados de comentário retornados pela API
 * - Inclui relacionamento com likes associados e dados do autor
 */
export interface ComentarioResponseDTO {
  /** ID único do comentário */
  id: string
  /** Conteúdo do comentário */
  conteudo: string
  /** Nota de avaliação (1 a 5 estrelas) */
  nota: number
  /** Indica se o comentário está visível publicamente */
  visivel: boolean
  /** Dados do autor do comentário */
  autor: {
    /** ID do autor */
    id: string
    /** Nome completo do autor */
    nome: string
    /** Email do autor */
    email: string
    /** URL da foto do autor (se houver) */
    fotoUrl?: string | null
  }
  /** ID do profissional associado ao comentário (opcional) */
  profissionalId?: string | null
  /** ID do motorista associado ao comentário (opcional) */
  motoristaId?: string | null
  /** ID da manutenção associada ao comentário (opcional) */
  manutencaoId?: string | null
  /** ID da acessibilidade urbana associada ao comentário (opcional) */
  acessibilidadeUrbanaId?: string | null
  /** Data e hora de criação do comentário */
  criadoEm: Date
  /** Data e hora da última atualização */
  atualizadoEm: Date
  /** Contagem total de likes */
  totalLikes: number
  /** Lista de IDs dos usuários que curtiram (simplificado) */
  usuariosQueCurtiram: string[]
}
