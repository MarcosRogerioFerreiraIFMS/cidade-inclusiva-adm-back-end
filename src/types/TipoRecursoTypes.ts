import { TipoRecurso } from '@prisma/client'

export { TipoRecurso }

/**
 * Valores possíveis para TipoRecurso
 */
export const TIPO_RECURSO_VALUES = Object.values(TipoRecurso)

/**
 * Verifica se um valor é um TipoRecurso válido
 */
export function isTipoRecurso(value: string): value is TipoRecurso {
  return TIPO_RECURSO_VALUES.includes(value as TipoRecurso)
}

/**
 * Converte string para TipoRecurso de forma segura
 */
export function toTipoRecurso(value: string): TipoRecurso | null {
  const upperValue = value.toUpperCase()
  return isTipoRecurso(upperValue) ? (upperValue as TipoRecurso) : null
}
