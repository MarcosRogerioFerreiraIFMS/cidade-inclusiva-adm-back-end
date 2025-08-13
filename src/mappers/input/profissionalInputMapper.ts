import { ProfissionalCreateDTO } from '../../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../../dtos/update/ProfissionalUpdateDTO'
import { HttpStatusCode } from '../../enums/HttpStatusCode'
import {
  createProfissionalSchema,
  updateProfissionalSchema
} from '../../schemas/ProfissionalSchema'
import { HttpError } from '../../utils/HttpError'

export function toCreateProfissionalDTO(
  input: unknown
): Promise<ProfissionalCreateDTO> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para criação do profissional.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return createProfissionalSchema.parseAsync(input)
}

export function toUpdateProfissionalDTO(
  input: unknown
): Promise<ProfissionalUpdateDTO> {
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Dados inválidos para atualização do profissional.',
      HttpStatusCode.BAD_REQUEST
    )
  }

  return updateProfissionalSchema.parseAsync(input)
}
