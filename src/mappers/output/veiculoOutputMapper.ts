import type { VeiculoResponseDTO } from '@/dtos/response'
import type { VeiculoCompletions } from '@/types'
import { formatPhoneNumber } from '@/utils'
import { toFotoResponseDTO, toFotosResponseDTO } from './fotoOutputMappers'

/**
 * - Converte entidade Veiculo completa para DTO de resposta
 * - Formata campos opcionais e aplica transformações de apresentação
 * @param {VeiculoCompletions} veiculo - Entidade veiculo completa do banco de dados
 * @returns {VeiculoResponseDTO} DTO formatado para resposta da API
 */
export function toVeiculoResponseDTO(
  veiculo: VeiculoCompletions
): VeiculoResponseDTO {
  return {
    id: veiculo.id,
    placa: formatPlaca(veiculo.placa),
    marca: veiculo.marca,
    modelo: veiculo.modelo,
    cor: veiculo.cor,
    motorista: {
      id: veiculo.motorista.id,
      nome: veiculo.motorista.nome,
      telefone: formatPhoneNumber(veiculo.motorista.telefone),
      email: veiculo.motorista.email,
      foto: toFotoResponseDTO(veiculo.motorista.foto)
    },
    fotos: toFotosResponseDTO(veiculo.fotos),
    criadoEm: veiculo.criadoEm,
    atualizadoEm: veiculo.atualizadoEm
  }
}

/**
 * - Converte lista de entidades Veiculo para lista de DTOs de resposta
 * - Aplica transformação individual para cada veículo da lista
 * @param {VeiculoCompletions[]} veiculos - Lista de entidades veiculo do banco de dados
 * @returns {VeiculoResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toVeiculosResponseDTO(
  veiculos: VeiculoCompletions[]
): VeiculoResponseDTO[] {
  return veiculos.map(toVeiculoResponseDTO)
}

/**
 * Formata a placa do veículo para exibição
 * @param placa - Placa no formato sem hífen (ABC1234 ou ABC1D23)
 * @returns Placa formatada (ABC-1234 ou ABC1D23)
 */
function formatPlaca(placa: string): string {
  if (placa.length === 7) {
    // Placa antiga: ABC1234 -> ABC-1234
    if (/^[A-Z]{3}[0-9]{4}$/.test(placa)) {
      return `${placa.slice(0, 3)}-${placa.slice(3)}`
    }
    // Placa Mercosul: ABC1D23 -> ABC1D23 (sem hífen)
    return placa
  }
  return placa
}
