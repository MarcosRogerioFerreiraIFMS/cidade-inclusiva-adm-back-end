import { ComentarioCreateDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'
import { HttpStatusCode } from '../../enums/HttpStatusCode'
import {
  createComentarioSchema,
  likeComentarioSchema,
  updateComentarioSchema
} from '../../schemas/ComentarioSchema'
import { HttpError } from '../../utils/HttpError'

export function toCreateComentarioDTO(
  input: unknown
): Promise<ComentarioCreateDTO> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para criação do comentário.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return createComentarioSchema.parseAsync(input)
}

export function toUpdateComentarioDTO(
  input: unknown
): Promise<ComentarioUpdateDTO> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para atualização do comentário.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return updateComentarioSchema.parseAsync(input)
}

export function toLikeComentarioDTO(
  input: unknown
): Promise<{ increment: number }> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para incrementar likes do comentário.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return likeComentarioSchema.parseAsync(input)
}
