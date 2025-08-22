import { ComentarioResponseDTO } from '../../dtos/response/ComentarioResponseDTO'

export interface IComentarioService {
  create(data: unknown): Promise<ComentarioResponseDTO>
  findById(id: string): Promise<ComentarioResponseDTO>
  update(id: string, data: unknown): Promise<ComentarioResponseDTO>
  delete(id: string): Promise<void>
  findAll(): Promise<ComentarioResponseDTO[]>
  findByProfissional(profissionalId: string): Promise<ComentarioResponseDTO[]>
  findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioResponseDTO[]>
}
