import { LikeResponseDTO } from '../../dtos/response/LikeResponseDTO'

export interface ILikeService {
  findById(id: string): Promise<LikeResponseDTO>
  toggle(
    usuarioId: string,
    comentarioId: string
  ): Promise<{ liked: boolean; totalLikes: number }>
  delete(id: string): Promise<void>
  findByComentario(comentarioId: string): Promise<LikeResponseDTO[]>
  findByUsuario(usuarioId: string): Promise<LikeResponseDTO[]>
}
