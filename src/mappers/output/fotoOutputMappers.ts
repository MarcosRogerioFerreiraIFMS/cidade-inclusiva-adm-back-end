import type { FotoResponseDTO, LogoResponseDTO } from '@/dtos/response'
import type { FotoCompletions, LogoCompletions } from '@/types'

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

export function toLogoResponseDTO(
  logo: LogoCompletions | null | undefined
): LogoResponseDTO | undefined {
  if (!logo) return undefined

  return {
    id: logo.id,
    url: logo.url
  }
}
