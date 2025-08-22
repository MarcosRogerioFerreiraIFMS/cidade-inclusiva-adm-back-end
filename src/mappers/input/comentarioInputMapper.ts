import { ComentarioCreateDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'
import {
  createComentarioSchema,
  updateComentarioSchema
} from '../../schemas/ComentarioSchema'

export function toCreateComentarioDTO(input: unknown): ComentarioCreateDTO {
  return createComentarioSchema.parse(input)
}

export function toUpdateComentarioDTO(input: unknown): ComentarioUpdateDTO {
  return updateComentarioSchema.parse(input)
}
