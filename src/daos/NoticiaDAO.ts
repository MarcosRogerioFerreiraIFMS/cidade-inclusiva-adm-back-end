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
    try {
      const dataToCreate = generateDataNoticiaCreate(data)

      const noticia = await db.noticia.create({
        data: dataToCreate
      })

      return noticia
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      throw error
    }
  }

  async findById(id: string): Promise<NoticiaCompletions | null> {
    try {
      return await db.noticia.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Erro ao buscar notícia por ID:', error)
      throw error
    }
  }

  async update(
    id: string,
    data: NoticiaUpdateDTO
  ): Promise<NoticiaCompletions> {
    try {
      const dataToUpdate = generateDataNoticiaUpdate(data)

      const noticia = await db.noticia.update({
        where: { id },
        data: dataToUpdate
      })

      return noticia
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.noticia.delete({ where: { id } })
    } catch (error) {
      console.error('Erro ao deletar notícia:', error)
      throw error
    }
  }

  async findAll(): Promise<NoticiaCompletions[]> {
    try {
      return await db.noticia.findMany({
        orderBy: {
          dataPublicacao: 'desc'
        }
      })
    } catch (error) {
      console.error('Erro ao buscar todas as notícias:', error)
      throw error
    }
  }
}
