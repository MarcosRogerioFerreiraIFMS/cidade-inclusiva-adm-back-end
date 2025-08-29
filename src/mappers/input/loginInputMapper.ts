import { LoginCreateDTO } from '../../dtos/create/LoginCreateDTO'
import { createLoginSchema } from '../../schemas/LoginSchema'

export function toCreateLoginDTO(data: unknown): LoginCreateDTO {
  return createLoginSchema.parse(data)
}
