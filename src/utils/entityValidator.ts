import { HttpStatusCode } from '@/enums'
import { HttpError } from './HttpError'

/**
 * Valida se uma entidade existe e lança erro HTTP 404 se não encontrada
 * Se o item for null, significa que a entidade não foi encontrada
 * @template T - Tipo genérico da entidade
 * @param {T | null} item - Item a ser validado (pode ser null)
 * @param {string} message - Mensagem de erro a ser exibida se o item não for encontrado
 * @returns {T} A entidade validada (garantida como não-nula)
 * @throws {HttpError} Erro HTTP 404 se o item for null
 */
export function throwIfNotFound<T>(item: T | null, message: string): T {
  if (!item) {
    throw new HttpError(message, HttpStatusCode.NOT_FOUND)
  }
  return item
}

/**
 * Valida se uma entidade já existe e lança erro HTTP 409 (Conflict) se encontrada
 * Se o item não for null, significa que já existe uma entidade com os mesmos critérios
 * @template T - Tipo genérico da entidade
 * @param {T | null} item - Item a ser validado (deve ser null para passar na validação)
 * @param {string} message - Mensagem de erro a ser exibida se o item já existir
 * @returns {void}
 * @throws {HttpError} Erro HTTP 409 se o item não for null
 */
export function throwIfAlreadyExists<T>(item: T | null, message: string): void {
  if (item) {
    throw new HttpError(message, HttpStatusCode.CONFLICT)
  }
}
