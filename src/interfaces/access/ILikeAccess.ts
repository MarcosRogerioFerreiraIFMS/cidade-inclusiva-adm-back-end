import { LikeCreateDTO } from '../../dtos/create/LikeCreateDTO'
import { LikeCompletions } from '../../types/LikeTypes'

export interface ILikeAccess {
  create(data: LikeCreateDTO): Promise<LikeCompletions>
  findById(id: string): Promise<LikeCompletions | null>
  findByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<LikeCompletions | null>
  delete(id: string): Promise<void>
  deleteByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<void>
  findByComentario(comentarioId: string): Promise<LikeCompletions[]>
  findByUsuario(usuarioId: string): Promise<LikeCompletions[]>
  countByComentario(comentarioId: string): Promise<number>
}
