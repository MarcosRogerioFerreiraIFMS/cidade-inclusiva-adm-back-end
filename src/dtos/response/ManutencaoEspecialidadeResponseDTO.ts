import type { ManutencaoEspecialidadeTipo } from '@/enums'

/**
 * DTO de resposta para especialidade de manutenção
 */
export interface ManutencaoEspecialidadeResponseDTO {
  /** ID único da especialidade */
  id: string
  /** Tipo da especialidade */
  tipo: ManutencaoEspecialidadeTipo
}
