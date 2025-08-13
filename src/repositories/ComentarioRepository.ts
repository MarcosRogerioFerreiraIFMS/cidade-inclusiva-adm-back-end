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
    return this.dao.create(data)
  }

  async findById(id: string): Promise<Comentario | null> {
    return this.dao.findById(id)
  }

  async update(id: string, data: ComentarioUpdateDTO): Promise<Comentario> {
    return this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return this.dao.delete(id)
  }

  async findAll(): Promise<Comentario[]> {
    return this.dao.findAll()
  }

  async findByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<Comentario[]> {
    return this.dao.findByEntidade(entidadeId, entidadeTipo)
  }

  async findVisibleByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<Comentario[]> {
    return this.dao.findVisibleByEntidade(entidadeId, entidadeTipo)
  }

  async incrementLikes(id: string, increment: number): Promise<Comentario> {
    return this.dao.incrementLikes(id, increment)
  }
}
