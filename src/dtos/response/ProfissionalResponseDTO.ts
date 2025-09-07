import { ComentarioResponseDTO } from './ComentarioResponseDTO'
import { FotoResponseDTO } from './FotoResponseDTO'

/**
 * - DTO (Data Transfer Object) de resposta para profissional
 * - Define a estrutura dos dados de profissional retornados pela API
 * - Inclui relacionamento com comentários associados
 */
export interface ProfissionalResponseDTO {
  /** ID único do profissional */
  id: string
  /** Nome completo do profissional */
  nome: string
  /** URL da foto do perfil (opcional) */
  foto?: FotoResponseDTO
  /** Número de telefone do profissional */
  telefone: string
  /** Endereço de email do profissional */
  email: string
  /** Área de especialidade do profissional */
  especialidade: string
  /** Data e hora de criação do registro */
  criadoEm: Date
  /** Lista de comentários associados ao profissional */
  comentarios: ComentarioResponseDTO[]
}
