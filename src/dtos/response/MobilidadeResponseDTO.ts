import type { MobilidadeStatus } from '@/enums'

/**
 * - DTO (Data Transfer Object) para resposta de mobilidade
 * - Define a estrutura de dados retornada pelas operações de mobilidade
 * - Contém todos os campos formatados para a resposta da API
 */
export interface MobilidadeResponseDTO {
  id: string
  latitude: number
  longitude: number
  descricao: string
  dataRegistro: Date
  status: MobilidadeStatus
  criadoEm: Date
  atualizadoEm: Date
  usuario?: {
    id: string
    nome: string
    email: string
    fotoUrl?: string | null
  }
}
