import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from './HttpError'

/**
 * Valida se uma entidade existe e lança erro HTTP 404 se não encontrada
 * Utility function para validação de existência de entidades no banco de dados
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
 * Utility function para validação de duplicação de entidades no banco de dados
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
