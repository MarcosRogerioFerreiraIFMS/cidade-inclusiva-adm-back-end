import { ComentarioCreateDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'
import { HttpStatusCode } from '../../enums/HttpStatusCode'
import {
  createComentarioSchema,
  updateComentarioSchema
} from '../../schemas/ComentarioSchema'
import { HttpError } from '../../utils/HttpError'

export function toCreateComentarioDTO(input: unknown): ComentarioCreateDTO {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para criação do comentário.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return createComentarioSchema.parse(input)
}

export function toUpdateComentarioDTO(input: unknown): ComentarioUpdateDTO {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para atualização do comentário.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return updateComentarioSchema.parse(input)
}
