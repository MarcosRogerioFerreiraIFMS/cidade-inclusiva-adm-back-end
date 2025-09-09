import { MotoristaResponseDTO } from '../../dtos/response'
import { MotoristaCompletions } from '../../types'
import { formatPhoneNumber } from '../../utils'
import { toFotoResponseDTO } from './'

/**
 * - Converte entidade Motorista completa para DTO de resposta
 * - Formata campos opcionais e aplica transformações de apresentação
 * @param {MotoristaCompletions} motorista - Entidade motorista completa do banco de dados
 * @returns {MotoristaResponseDTO} DTO formatado para resposta da API
 */
export function toMotoristaResponseDTO(
  motorista: MotoristaCompletions
): MotoristaResponseDTO {
  return {
    id: motorista.id,
    nome: motorista.nome,
    telefone: formatPhoneNumber(motorista.telefone),
    email: motorista.email,
    foto: toFotoResponseDTO(motorista.foto),
    veiculo: motorista.veiculo
      ? {
          id: motorista.veiculo.id,
          placa: formatPlaca(motorista.veiculo.placa),
          marca: motorista.veiculo.marca,
          modelo: motorista.veiculo.modelo,
          cor: motorista.veiculo.cor,
          fotos: motorista.veiculo.fotos.map((foto) => ({
            id: foto.id,
            url: foto.url
          }))
        }
      : undefined,
    criadoEm: motorista.criadoEm,
    atualizadoEm: motorista.atualizadoEm
  }
}

/**
 * - Converte lista de entidades Motorista para lista de DTOs de resposta
 * - Aplica transformação individual para cada motorista da lista
 * @param {MotoristaCompletions[]} motoristas - Lista de entidades motorista do banco de dados
 * @returns {MotoristaResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toMotoristasResponseDTO(
  motoristas: MotoristaCompletions[]
): MotoristaResponseDTO[] {
  return motoristas.map(toMotoristaResponseDTO)
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
