import { ComentarioResponseDTO } from './ComentarioResponseDTO'

export interface ProfissionalResponseDTO {
  id: string
  nome: string
  foto?: string
  telefone: string
  email: string
  especialidade: string
  criadoEm: Date
  comentarios: ComentarioResponseDTO[]
}
