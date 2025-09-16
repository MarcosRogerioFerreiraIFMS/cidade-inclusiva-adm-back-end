import type { EspecialidadeManutencaoResponseDTO } from '@/dtos/response'
import type { ManutencaoCompletions } from '@/types'

export function toEspecialidadeManutencoesResponseDTO(
  especialidades: ManutencaoCompletions['especialidades']
): EspecialidadeManutencaoResponseDTO[] {
  return especialidades.map((especialidade) => ({
    id: especialidade.id,
    nome: especialidade.nome
  }))
}
