import { UsuarioCreateDTO } from '../../dtos/create/UsuarioCreateDTO'
import { UsuarioUpdateDTO } from '../../dtos/update/UsuarioUpdateDTO'
import {
  createUsuarioSchema,
  updateUsuarioSchema
} from '../../schemas/UsuarioSchema'

export function toCreateUsuarioDTO(data: unknown): Promise<UsuarioCreateDTO> {
  return createUsuarioSchema.parseAsync(data)
}

export function toUpdateUsuarioDTO(data: unknown): Promise<UsuarioUpdateDTO> {
  return updateUsuarioSchema.parseAsync(data)
}
