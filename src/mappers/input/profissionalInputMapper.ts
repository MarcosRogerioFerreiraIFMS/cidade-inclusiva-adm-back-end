import { ProfissionalCreateDTO } from '../../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../../dtos/update/ProfissionalUpdateDTO'
import {
  createProfissionalSchema,
  updateProfissionalSchema
} from '../../schemas/ProfissionalSchema'

export function toCreateProfissionalDTO(
  input: unknown
): Promise<ProfissionalCreateDTO> {
  return createProfissionalSchema.parseAsync(input)
}

export function toUpdateProfissionalDTO(
  input: unknown
): Promise<ProfissionalUpdateDTO> {
  return updateProfissionalSchema.parseAsync(input)
}
