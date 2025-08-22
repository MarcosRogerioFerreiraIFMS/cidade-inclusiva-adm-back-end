import { UsuarioResponseDTO } from '../../dtos/response/UsuarioResponseDTO'

export interface IUsuarioService {
  create(data: unknown): Promise<UsuarioResponseDTO>
  findById(id: string): Promise<UsuarioResponseDTO>
  findByEmail(email: string): Promise<UsuarioResponseDTO>
  update(id: string, data: unknown): Promise<UsuarioResponseDTO>
  delete(id: string): Promise<void>
  findAll(): Promise<UsuarioResponseDTO[]>
}
