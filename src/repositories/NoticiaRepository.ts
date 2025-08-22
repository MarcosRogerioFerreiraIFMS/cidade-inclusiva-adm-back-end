import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'
import { INoticiaAccess } from '../interfaces/access/INoticiaAccess'
import { NoticiaCompletions } from '../types/NoticiaTypes'

export class NoticiaRepository implements INoticiaAccess {
  private dao: INoticiaAccess

  constructor(dao: INoticiaAccess) {
    this.dao = dao
  }

  async create(data: NoticiaCreateDTO): Promise<NoticiaCompletions> {
    return await this.dao.create(data)
  }

  async findById(id: string): Promise<NoticiaCompletions | null> {
    return await this.dao.findById(id)
  }

  async update(
    id: string,
    data: NoticiaUpdateDTO
  ): Promise<NoticiaCompletions> {
    return await this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async findAll(): Promise<NoticiaCompletions[]> {
    return await this.dao.findAll()
  }
}
