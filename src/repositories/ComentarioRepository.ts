import { Comentario } from '@prisma/client'
import { ComentarioCreateDTO } from '../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../dtos/update/ComentarioUpdateDTO'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'

export class ComentarioRepository implements IComentarioAccess {
  private dao: IComentarioAccess

  constructor(dao: IComentarioAccess) {
    this.dao = dao
  }

  async create(data: ComentarioCreateDTO): Promise<Comentario> {
    return await this.dao.create(data)
  }

  async findById(id: string): Promise<Comentario | null> {
    return await this.dao.findById(id)
  }

  async update(id: string, data: ComentarioUpdateDTO): Promise<Comentario> {
    return await this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async findAll(): Promise<Comentario[]> {
    return await this.dao.findAll()
  }

  async findByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<Comentario[]> {
    return await this.dao.findByEntidade(entidadeId, entidadeTipo)
  }

  async findVisibleByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<Comentario[]> {
    return await this.dao.findVisibleByEntidade(entidadeId, entidadeTipo)
  }

  async incrementLikes(id: string): Promise<Comentario> {
    return await this.dao.incrementLikes(id)
  }

  async decrementLikes(id: string): Promise<Comentario> {
    return await this.dao.decrementLikes(id)
  }
}
