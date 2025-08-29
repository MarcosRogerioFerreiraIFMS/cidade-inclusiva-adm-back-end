import { UsuarioResponseDTO } from './UsuarioResponseDTO'

export interface LoginResponseDTO {
  token: string
  usuario: UsuarioResponseDTO
}
