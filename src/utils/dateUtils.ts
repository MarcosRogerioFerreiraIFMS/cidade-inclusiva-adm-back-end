/**
 * Utilitários para validação e manipulação de datas
 */

/**
 * Verifica se uma string representa uma data válida
 * @param dateString - String no formato ISO 8601 ou qualquer formato aceito por Date
 * @returns true se a data for válida, false caso contrário
 */
export function isValidDateString(dateString: string): boolean {
  try {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  } catch {
    return false
  }
}

/**
 * Verifica se uma data não está no futuro
 * @param date - Data a ser verificada (Date ou string)
 * @returns true se a data for menor ou igual à data atual, false se for futura
 */
export function isNotFutureDate(date: Date | string): boolean {
  const dateToCheck = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  return dateToCheck <= now
}

/**
 * Verifica se uma data está no futuro
 * @param date - Data a ser verificada (Date ou string)
 * @returns true se a data for maior que a data atual, false caso contrário
 */
export function isFutureDate(date: Date | string): boolean {
  return !isNotFutureDate(date)
}

/**
 * Verifica se uma data está no passado
 * @param date - Data a ser verificada (Date ou string)
 * @returns true se a data for menor que a data atual, false caso contrário
 */
export function isPastDate(date: Date | string): boolean {
  const dateToCheck = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  return dateToCheck < now
}

/**
 * Verifica se uma data é hoje
 * @param date - Data a ser verificada (Date ou string)
 * @returns true se a data for hoje, false caso contrário
 */
export function isToday(date: Date | string): boolean {
  const dateToCheck = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  return (
    dateToCheck.getDate() === now.getDate() &&
    dateToCheck.getMonth() === now.getMonth() &&
    dateToCheck.getFullYear() === now.getFullYear()
  )
}

/**
 * Mensagens de erro padrão para validações de data
 */
export const DATE_ERROR_MESSAGES = {
  INVALID_FORMAT: 'A data deve estar no formato ISO 8601.',
  INVALID_DATE: 'A data fornecida não é válida.',
  FUTURE_DATE_NOT_ALLOWED:
    'A data não pode ser no futuro. Utilize a data atual ou uma data passada.',
  PAST_DATE_NOT_ALLOWED:
    'A data não pode ser no passado. Utilize a data atual ou uma data futura.',
  REQUIRED: 'A data é obrigatória.'
} as const
