import { EspecialidadeManutencaoResponseDTO } from '@/dtos/response'
import { ManutencaoCompletions } from '@/types'

export function toEspecialidadeManutencoesResponseDTO(
  especialidades: ManutencaoCompletions['especialidades']
): EspecialidadeManutencaoResponseDTO[] {
  return especialidades.map((especialidade) => ({
    id: especialidade.id,
    nome: especialidade.nome
  }))
}
