import { NoticiaCreateDTO } from '../../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../../dtos/update/NoticiaUpdateDTO'
import {
  createNoticiaSchema,
  updateNoticiaSchema
} from '../../schemas/NoticiaSchema'

export function toCreateNoticiaDTO(input: unknown): Promise<NoticiaCreateDTO> {
  return createNoticiaSchema.parseAsync(input)
}

export function toUpdateNoticiaDTO(input: unknown): Promise<NoticiaUpdateDTO> {
  return updateNoticiaSchema.parseAsync(input)
}
