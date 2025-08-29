import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'
import {
  generateDataNoticiaCreate,
  generateDataNoticiaUpdate
} from '../helpers/generateDataNoticia'
import { INoticiaAccess } from '../interfaces/access/INoticiaAccess'
import { db } from '../lib/prisma'
import { NoticiaCompletions } from '../types/NoticiaTypes'

export class NoticiaDAO implements INoticiaAccess {
  async create(data: NoticiaCreateDTO): Promise<NoticiaCompletions> {
    const dataToCreate = generateDataNoticiaCreate(data)

    const noticia = await db.noticia.create({
      data: dataToCreate
    })

    return noticia
  }

  async findById(id: string): Promise<NoticiaCompletions | null> {
    return await db.noticia.findUnique({
      where: { id }
    })
  }

  async update(
    id: string,
    data: NoticiaUpdateDTO
  ): Promise<NoticiaCompletions> {
    const dataToUpdate = generateDataNoticiaUpdate(data)

    const noticia = await db.noticia.update({
      where: { id },
      data: dataToUpdate
    })

    return noticia
  }

  async delete(id: string): Promise<void> {
    await db.noticia.delete({ where: { id } })
  }

  async findAll(): Promise<NoticiaCompletions[]> {
    return await db.noticia.findMany({
      orderBy: {
        dataPublicacao: 'desc'
      }
    })
  }
}
