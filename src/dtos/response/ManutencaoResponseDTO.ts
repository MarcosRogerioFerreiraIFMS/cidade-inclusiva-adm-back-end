import type { EnderecoResponseDTO } from './EnderecoResponseDTO'
import type { EspecialidadeManutencaoResponseDTO } from './EspecialidadeManutencaoResponseDTO'
import type { FotoResponseDTO } from './FotoResponsesDTO'

/**
 * - DTO (Data Transfer Object) para resposta de manutenção
 * - Formato de dados que será retornado nas respostas da API
 * - Omite campos sensíveis e inclui apenas dados públicos
 */
export interface ManutencaoResponseDTO {
  id: string
  nome: string
  telefone: string
  email: string
  endereco?: EnderecoResponseDTO
  fotos: FotoResponseDTO[]
  logo?: FotoResponseDTO
  especialidades: EspecialidadeManutencaoResponseDTO[]
  criadoEm: Date
}
