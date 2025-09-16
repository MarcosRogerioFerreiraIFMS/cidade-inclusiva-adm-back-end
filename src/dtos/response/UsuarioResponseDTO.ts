import type { EnderecoResponseDTO } from './EnderecoResponseDTO'
import type { FotoResponseDTO } from './FotoResponsesDTO'

/**
 * - DTO (Data Transfer Object) de resposta para usuário
 * - Define a estrutura dos dados de usuário retornados pela API
 * - Exclui campos sensíveis como senha
 */
export interface UsuarioResponseDTO {
  /** ID único do usuário */
  id: string
  /** Nome completo do usuário */
  nome: string
  /** Número de telefone do usuário */
  telefone: string
  /** URL da foto do perfil (opcional) */
  foto?: FotoResponseDTO
  /** Endereço de email do usuário */
  email: string
  /** Endereço completo do usuário (opcional) */
  endereco?: EnderecoResponseDTO
  /** Data e hora de criação do usuário */
  criadoEm: Date
}
