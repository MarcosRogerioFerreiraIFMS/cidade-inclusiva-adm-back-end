import { LikeCreateDTO } from '../dtos/create/LikeCreateDTO'
import { ILikeAccess } from '../interfaces/access/ILikeAccess'
import { LikeCompletions } from '../types/LikeTypes'

export class LikeRepository implements ILikeAccess {
  private dao: ILikeAccess

  constructor(dao: ILikeAccess) {
    this.dao = dao
  }

  async create(data: LikeCreateDTO): Promise<LikeCompletions> {
    return await this.dao.create(data)
  }

  async findById(id: string): Promise<LikeCompletions | null> {
    return await this.dao.findById(id)
  }

  async findByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<LikeCompletions | null> {
    return await this.dao.findByUsuarioAndComentario(usuarioId, comentarioId)
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async deleteByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<void> {
    return await this.dao.deleteByUsuarioAndComentario(usuarioId, comentarioId)
  }

  async findByComentario(comentarioId: string): Promise<LikeCompletions[]> {
    return await this.dao.findByComentario(comentarioId)
  }

  async findByUsuario(usuarioId: string): Promise<LikeCompletions[]> {
    return await this.dao.findByUsuario(usuarioId)
  }

  async countByComentario(comentarioId: string): Promise<number> {
    return await this.dao.countByComentario(comentarioId)
  }
}
