import { Noticia, Prisma } from '@prisma/client'
import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'
import { INoticiaAccess } from '../interfaces/access/INoticiaAccess'
import { db } from '../lib/prisma'
import { HttpError } from '../utils/HttpError'

export class NoticiaDAO implements INoticiaAccess {
  async create(data: NoticiaCreateDTO): Promise<Noticia> {
    try {
      const { titulo, conteudo, url, foto, categoria, dataPublicacao } = data

      const dataToCreate: Prisma.NoticiaCreateInput = {
        titulo,
        conteudo,
        url: url ?? '',
        foto: foto ?? '',
        categoria,
        dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : new Date()
      }

      const noticia = await db.noticia.create({
        data: dataToCreate
      })

      return noticia
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      throw error
    }
  }

  async findById(id: string): Promise<Noticia | null> {
    try {
      return await db.noticia.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Erro ao buscar notícia por ID:', error)
      throw error
    }
  }

  async update(id: string, data: NoticiaUpdateDTO): Promise<Noticia> {
    try {
      const dataToUpdate: Prisma.NoticiaUpdateInput = {
        ...(data.titulo !== undefined && { titulo: data.titulo }),
        ...(data.conteudo !== undefined && { conteudo: data.conteudo }),
        ...(data.url !== undefined && { url: data.url }),
        ...(data.foto !== undefined && { foto: data.foto }),
        ...(data.categoria !== undefined && { categoria: data.categoria }),
        ...(data.dataPublicacao !== undefined &&
          (() => {
            const date = new Date(data.dataPublicacao)
            if (isNaN(date.getTime())) {
              throw new HttpError('Data de publicação inválida.', 400)
            }
            return { dataPublicacao: date }
          })())
      }

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

  async findAll(): Promise<Noticia[]> {
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
