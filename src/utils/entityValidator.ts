import { HttpStatusCode } from '../enums/HttpStatusCode'
import { HttpError } from './HttpError'

export function throwIfNotFound<T>(item: T | null, message: string): T {
  if (!item) {
    throw new HttpError(message, HttpStatusCode.NOT_FOUND)
  }
  return item
}

export function throwIfAlreadyExists<T>(item: T | null, message: string): void {
  if (item) {
    throw new HttpError(message, HttpStatusCode.CONFLICT)
  }
}
