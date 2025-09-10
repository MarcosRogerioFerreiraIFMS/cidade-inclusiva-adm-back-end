import { FotoResponseDTO } from '@/dtos/response'
import { FotoCompletions } from '@/types'

export function toFotoResponseDTO(
  foto: FotoCompletions | null | undefined
): FotoResponseDTO | undefined {
  if (!foto) return undefined

  return {
    id: foto.id,
    url: foto.url
  }
}

export function toFotosResponseDTO(
  fotos: FotoCompletions[]
): FotoResponseDTO[] {
  return fotos
    .map(toFotoResponseDTO)
    .filter((foto): foto is FotoResponseDTO => foto !== undefined)
}
