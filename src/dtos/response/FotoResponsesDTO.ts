/**
 * DTO (Data Transfer Object) de resposta para foto
 * Define a estrutura dos dados de foto retornados pela API
 */
export interface FotoResponseDTO {
  /** ID único da foto */
  id: string
  /** URL da foto */
  url: string
}

/** DTO (Data Transfer Object) de resposta para logo
 * Define a estrutura dos dados de logo retornados pela API
 */
export type LogoResponseDTO = FotoResponseDTO
