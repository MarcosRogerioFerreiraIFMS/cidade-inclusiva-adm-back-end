import { FotoResponseDTO } from './'

/**
 * - DTO (Data Transfer Object) para resposta de veículo
 * - Representa os dados de um veículo que são retornados ao cliente
 * - Inclui informações do motorista associado e fotos
 */
export interface VeiculoResponseDTO {
  id: string
  placa: string
  marca: string
  modelo: string
  cor: string
  motorista: {
    id: string
    nome: string
    telefone: string
    email: string
    foto?: FotoResponseDTO
  }
  fotos: FotoResponseDTO[]
  criadoEm: Date
  atualizadoEm: Date
}
