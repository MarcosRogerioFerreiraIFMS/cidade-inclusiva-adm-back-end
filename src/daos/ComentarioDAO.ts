import { ComentarioCreateDTO } from '../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../dtos/update/ComentarioUpdateDTO'
import {
  generateDataComentarioCreate,
  generateDataComentarioUpdate
} from '../helpers/generateDataComentario'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'
import { db } from '../lib/prisma'
import { ComentarioCompletions } from '../types/ComentarioTypes'

export class ComentarioDAO implements IComentarioAccess {
  async create(data: ComentarioCreateDTO): Promise<ComentarioCompletions> {
    const dataToCreate = generateDataComentarioCreate(data)
    return await db.comentario.create({
      data: dataToCreate,
      include: { likesUsuarios: true }
    })
  }

  async findById(id: string): Promise<ComentarioCompletions | null> {
    return await db.comentario.findUnique({
      where: { id },
      include: { likesUsuarios: true }
    })
  }

  async update(
    id: string,
    data: ComentarioUpdateDTO
  ): Promise<ComentarioCompletions> {
    const dataToUpdate = generateDataComentarioUpdate(data)
    return await db.comentario.update({
      where: { id },
      include: { likesUsuarios: true },
      data: dataToUpdate
    })
  }

  async delete(id: string): Promise<void> {
    await db.comentario.delete({
      where: { id }
    })
  }

  async findAll(): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }

  async findByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: { profissionalId },
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }

  async findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        profissionalId,
        visivel: true
      },
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }
}
