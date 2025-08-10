import { NoticiaCreateDTO } from '../../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../../dtos/update/NoticiaUpdateDTO'
import { HttpStatusCode } from '../../enums/HttpStatusCode'
import {
  createNoticiaSchema,
  updateNoticiaSchema
} from '../../schemas/NoticiaSchema'
import { HttpError } from '../../utils/HttpError'

export function toCreateNoticiaDTO(input: unknown): Promise<NoticiaCreateDTO> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para criação da notícia.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return createNoticiaSchema.parseAsync(input)
}

export function toUpdateNoticiaDTO(input: unknown): Promise<NoticiaUpdateDTO> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para atualização da notícia.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return updateNoticiaSchema.parseAsync(input)
}
