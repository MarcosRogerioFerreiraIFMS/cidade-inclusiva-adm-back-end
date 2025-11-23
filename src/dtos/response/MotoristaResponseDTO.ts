import type { FotoResponseDTO } from './FotoResponsesDTO'

/**
 * - DTO (Data Transfer Object) para resposta de motorista
 * - Representa os dados de um motorista que são retornados ao cliente
 * - Exclui informações sensíveis e inclui apenas dados públicos
 */
export interface MotoristaResponseDTO {
  id: string
  nome: string
  telefone: string
  email: string
  foto?: FotoResponseDTO
  veiculo?: {
    id: string
    placa: string
    marca: string
    modelo: string
    cor: string
    fotos: FotoResponseDTO[]
  }
  criadoEm: Date
}
