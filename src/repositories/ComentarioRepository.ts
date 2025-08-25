import { ComentarioCreateRelationalDTO } from '../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../dtos/update/ComentarioUpdateDTO'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'
import { ComentarioCompletions } from '../types/ComentarioTypes'

export class ComentarioRepository implements IComentarioAccess {
  private dao: IComentarioAccess

  constructor(dao: IComentarioAccess) {
    this.dao = dao
  }

  async create(
    data: ComentarioCreateRelationalDTO
  ): Promise<ComentarioCompletions> {
    return await this.dao.create(data)
  }

  async findById(id: string): Promise<ComentarioCompletions | null> {
    return await this.dao.findById(id)
  }

  async update(
    id: string,
    data: ComentarioUpdateDTO
  ): Promise<ComentarioCompletions> {
    return await this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async findAll(): Promise<ComentarioCompletions[]> {
    return await this.dao.findAll()
  }

  async findByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findByProfissional(profissionalId)
  }

  async findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findVisibleByProfissional(profissionalId)
  }
}
