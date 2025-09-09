import { ManutencaoResponseDTO } from '../../dtos/response'
import { ManutencaoCompletions } from '../../types'
import {
  toEnderecoResponseDTO,
  toEspecialidadeManutencoesResponseDTO,
  toFotosResponseDTO
} from './'

/**
 * - Converte dados de manutenção do banco para DTO de resposta
 * - Remove campos sensíveis e formata dados para API
 * @param {ManutencaoCompletions} manutencao - Dados da manutenção do banco
 * @returns {ManutencaoResponseDTO} Dados formatados para resposta da API
 */
export function toManutencaoResponseDTO(
  manutencao: ManutencaoCompletions
): ManutencaoResponseDTO {
  return {
    id: manutencao.id,
    nome: manutencao.nome,
    telefone: manutencao.telefone,
    email: manutencao.email,
    endereco: toEnderecoResponseDTO(manutencao.endereco),
    fotos: toFotosResponseDTO(manutencao.fotos),
    logo: manutencao.logo
      ? {
          id: manutencao.logo.id,
          url: manutencao.logo.url
        }
      : undefined,
    especialidades: toEspecialidadeManutencoesResponseDTO(
      manutencao.especialidades
    )
  }
}

/**
 * - Converte lista de manutenções do banco para DTOs de resposta
 * - Aplica formatação a cada item da lista
 * @param {ManutencaoCompletions[]} manutencoes - Lista de manutenções do banco
 * @returns {ManutencaoResponseDTO[]} Lista formatada para resposta da API
 */
export function toManutencoesResponseDTO(
  manutencoes: ManutencaoCompletions[]
): ManutencaoResponseDTO[] {
  return manutencoes.map(toManutencaoResponseDTO)
}
