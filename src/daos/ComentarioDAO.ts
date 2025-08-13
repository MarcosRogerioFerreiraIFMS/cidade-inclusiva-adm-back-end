import { Comentario, TipoEntidade } from '@prisma/client'
import { ComentarioCreateDTO } from '../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../dtos/update/ComentarioUpdateDTO'
import {
  generateDataComentarioCreate,
  generateDataComentarioUpdate
} from '../helpers/generateDataComentario'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'
import { db } from '../lib/prisma'

export class ComentarioDAO implements IComentarioAccess {
  async create(data: ComentarioCreateDTO): Promise<Comentario> {
    try {
      const dataToCreate = generateDataComentarioCreate(data)

      const comentario = await db.comentario.create({
        data: dataToCreate
      })

      return comentario
    } catch (error) {
      console.error('Erro ao criar comentário:', error)
      throw error
    }
  }

  async findById(id: string): Promise<Comentario | null> {
    try {
      return await db.comentario.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Erro ao buscar comentário por ID:', error)
      throw error
    }
  }

  async update(id: string, data: ComentarioUpdateDTO): Promise<Comentario> {
    try {
      const dataToUpdate = generateDataComentarioUpdate(data)

      const comentario = await db.comentario.update({
        where: { id },
        data: dataToUpdate
      })

      return comentario
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.comentario.delete({ where: { id } })
    } catch (error) {
      console.error('Erro ao deletar comentário:', error)
      throw error
    }
  }

  async findAll(): Promise<Comentario[]> {
    try {
      return await db.comentario.findMany({
        orderBy: {
          criadoEm: 'desc'
        }
      })
    } catch (error) {
      console.error('Erro ao buscar todos os comentários:', error)
      throw error
    }
  }

  async findByEntidade(
    entidadeId: string,
    entidadeTipo: TipoEntidade
  ): Promise<Comentario[]> {
    try {
      return await db.comentario.findMany({
        where: {
          entidadeId,
          entidadeTipo
        },
        orderBy: {
          criadoEm: 'desc'
        }
      })
    } catch (error) {
      console.error('Erro ao buscar comentários por entidade:', error)
      throw error
    }
  }

  async findVisibleByEntidade(
    entidadeId: string,
    entidadeTipo: TipoEntidade
  ): Promise<Comentario[]> {
    try {
      return await db.comentario.findMany({
        where: {
          entidadeId,
          entidadeTipo,
          visivel: true
        },
        orderBy: {
          criadoEm: 'desc'
        }
      })
    } catch (error) {
      console.error('Erro ao buscar comentários visíveis por entidade:', error)
      throw error
    }
  }

  async incrementLikes(id: string, increment: number): Promise<Comentario> {
    try {
      const comentario = await db.comentario.update({
        where: { id },
        data: {
          likes: {
            increment
          }
        }
      })

      return comentario
    } catch (error) {
      console.error('Erro ao incrementar likes do comentário:', error)
      throw error
    }
  }
}
