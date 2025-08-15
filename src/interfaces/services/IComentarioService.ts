import { ComentarioResponseDTO } from '../../dtos/response/ComentarioResponseDTO'

export interface IComentarioService {
  create(data: unknown): Promise<ComentarioResponseDTO>
  findById(id: string): Promise<ComentarioResponseDTO>
  update(id: string, data: unknown): Promise<ComentarioResponseDTO>
  delete(id: string): Promise<void>
  findAll(): Promise<ComentarioResponseDTO[]>
  findByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<ComentarioResponseDTO[]>
  findVisibleByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<ComentarioResponseDTO[]>
  incrementLikes(id: string): Promise<ComentarioResponseDTO>
  decrementLikes(id: string): Promise<ComentarioResponseDTO>
}
