import { Noticia } from '@prisma/client'
import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'
import { INoticiaAccess } from '../interfaces/access/INoticiaAccess'

export class NoticiaRepository implements INoticiaAccess {
  private dao: INoticiaAccess

  constructor(dao: INoticiaAccess) {
    this.dao = dao
  }

  async create(data: NoticiaCreateDTO): Promise<Noticia> {
    return this.dao.create(data)
  }

  async findById(id: string): Promise<Noticia | null> {
    return this.dao.findById(id)
  }

  async update(id: string, data: NoticiaUpdateDTO): Promise<Noticia> {
    return this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return this.dao.delete(id)
  }

  async findAll(): Promise<Noticia[]> {
    return this.dao.findAll()
  }
}
