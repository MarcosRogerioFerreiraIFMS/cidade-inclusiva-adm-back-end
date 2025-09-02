import { TipoRecurso } from '@prisma/client'

export { TipoRecurso }

/**
 * Array com todos os valores possíveis para o enum TipoRecurso
 * @constant {TipoRecurso[]}
 */
export const TIPO_RECURSO_VALUES = Object.values(TipoRecurso)

/**
 * Verifica se um valor string é um TipoRecurso válido
 * @param {string} value - Valor a ser verificado
 * @returns {value is TipoRecurso} True se o valor for um TipoRecurso válido
 */
export function isTipoRecurso(value: string): value is TipoRecurso {
  return TIPO_RECURSO_VALUES.includes(value as TipoRecurso)
}

/**
 * Converte uma string para TipoRecurso de forma segura
 * @param {string} value - String a ser convertida
 * @returns {TipoRecurso | null} TipoRecurso válido ou null se inválido
 */
export function toTipoRecurso(value: string): TipoRecurso | null {
  const upperValue = value.toUpperCase()
  return isTipoRecurso(upperValue) ? (upperValue as TipoRecurso) : null
}
