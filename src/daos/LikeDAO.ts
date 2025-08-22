import { LikeCreateDTO } from '../dtos/create/LikeCreateDTO'
import { generateDataLikeCreate } from '../helpers/generateDataLike'
import { ILikeAccess } from '../interfaces/access/ILikeAccess'
import { db } from '../lib/prisma'
import { LikeCompletions } from '../types/LikeTypes'

export class LikeDAO implements ILikeAccess {
  async create(data: LikeCreateDTO): Promise<LikeCompletions> {
    const dataToCreate = generateDataLikeCreate(data)
    return await db.like.create({
      data: dataToCreate
    })
  }

  async findById(id: string): Promise<LikeCompletions | null> {
    return await db.like.findUnique({
      where: { id }
    })
  }

  async findByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<LikeCompletions | null> {
    return await db.like.findUnique({
      where: {
        usuarioId_comentarioId: {
          usuarioId,
          comentarioId
        }
      }
    })
  }

  async delete(id: string): Promise<void> {
    await db.like.delete({
      where: { id }
    })
  }

  async deleteByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<void> {
    await db.like.delete({
      where: {
        usuarioId_comentarioId: {
          usuarioId,
          comentarioId
        }
      }
    })
  }

  async findByComentario(comentarioId: string): Promise<LikeCompletions[]> {
    return await db.like.findMany({
      where: { comentarioId }
    })
  }

  async findByUsuario(usuarioId: string): Promise<LikeCompletions[]> {
    return await db.like.findMany({
      where: { usuarioId }
    })
  }

  async countByComentario(comentarioId: string): Promise<number> {
    return await db.like.count({
      where: { comentarioId }
    })
  }
}
