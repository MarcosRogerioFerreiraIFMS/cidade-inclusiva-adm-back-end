import type { MobilidadeResponseDTO } from '@/dtos/response'
import type { MobilidadeCompletions } from '@/types'

/**
 * - Converte entidade Mobilidade completa para DTO de resposta
 * - Formata campos opcionais e aplica transformações de apresentação
 * @param {MobilidadeCompletions} mobilidade - Entidade mobilidade completa do banco de dados
 * @returns {MobilidadeResponseDTO} DTO formatado para resposta da API
 */
export function toMobilidadeResponseDTO(
  mobilidade: MobilidadeCompletions
): MobilidadeResponseDTO {
  return {
    id: mobilidade.id,
    latitude: mobilidade.latitude,
    longitude: mobilidade.longitude,
    descricao: mobilidade.descricao,
    dataRegistro: mobilidade.dataRegistro,
    status: mobilidade.status,
    usuarioId: mobilidade.usuarioId ?? undefined,
    criadoEm: mobilidade.criadoEm,
    atualizadoEm: mobilidade.atualizadoEm,
    usuario: mobilidade.usuario
      ? {
          id: mobilidade.usuario.id,
          nome: mobilidade.usuario.nome,
          email: mobilidade.usuario.email
        }
      : undefined
  }
}

/**
 * - Converte lista de entidades Mobilidade para lista de DTOs de resposta
 * - Aplica transformação individual para cada mobilidade da lista
 * @param {MobilidadeCompletions[]} mobilidades - Lista de entidades mobilidade do banco de dados
 * @returns {MobilidadeResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toMobilidadesResponseDTO(
  mobilidades: MobilidadeCompletions[]
): MobilidadeResponseDTO[] {
  return mobilidades.map(toMobilidadeResponseDTO)
}
