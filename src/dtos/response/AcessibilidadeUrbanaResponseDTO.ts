import type { EnderecoResponseDTO } from './EnderecoResponseDTO'
import type { FotoResponseDTO } from './FotoResponsesDTO'

/**
 * - DTO (Data Transfer Object) de resposta para recurso individual de acessibilidade urbana
 * - Define a estrutura dos dados de recurso retornados pela API
 */
export interface AcessibilidadeUrbanaRecursoResponseDTO {
  /** ID único do recurso */
  id: string
  /** Símbolo de acessibilidade */
  simbolo: string
  /** Descrição do recurso (opcional) */
  descricao?: string
  /** Data e hora de criação do registro */
  criadoEm: Date
}

/**
 * - DTO (Data Transfer Object) de resposta para acessibilidade urbana
 * - Define a estrutura dos dados de acessibilidade urbana retornados pela API
 */
export interface AcessibilidadeUrbanaResponseDTO {
  /** ID único da acessibilidade urbana */
  id: string
  /** Nome do estabelecimento */
  nome: string
  /** Telefone de contato */
  telefone: string
  /** E-mail de contato */
  email: string
  /** Categoria do estabelecimento */
  categoria: string
  /** Logo do estabelecimento (opcional) */
  logo?: FotoResponseDTO
  /** Fotos do estabelecimento */
  fotos: FotoResponseDTO[]
  /** Endereço do estabelecimento (opcional) */
  endereco?: EnderecoResponseDTO
  /** Recursos de acessibilidade disponíveis */
  recursos: AcessibilidadeUrbanaRecursoResponseDTO[]
  /** Data e hora de criação do registro */
  criadoEm: Date
}
