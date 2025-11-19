import type { ManutencaoEspecialidadeResponseDTO } from '@/dtos/response'
import type { ManutencaoCompletions } from '@/types'

export function toManutencaoEspecialidadesResponseDTO(
  especialidades: ManutencaoCompletions['especialidades']
): ManutencaoEspecialidadeResponseDTO[] {
  return especialidades.map((especialidade) => ({
    id: especialidade.id,
    tipo: especialidade.tipo
  }))
}
