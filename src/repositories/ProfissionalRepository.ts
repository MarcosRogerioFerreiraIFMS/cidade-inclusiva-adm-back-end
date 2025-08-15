import { Comentario, Profissional } from '@prisma/client'
import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'

export class ProfissionalRepository implements IProfissionalAccess {
  private dao: IProfissionalAccess

  constructor(dao: IProfissionalAccess) {
    this.dao = dao
  }

  async create(data: ProfissionalCreateDTO): Promise<Profissional> {
    return await this.dao.create(data)
  }

  async findById(
    id: string
  ): Promise<(Profissional & { comentarios: Comentario[] }) | null> {
    return await this.dao.findById(id)
  }

  async findByEmail(
    email: string
  ): Promise<(Profissional & { comentarios: Comentario[] }) | null> {
    return await this.dao.findByEmail(email)
  }

  async update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<Profissional & { comentarios: Comentario[] }> {
    return await this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async findAll(): Promise<(Profissional & { comentarios: Comentario[] })[]> {
    return await this.dao.findAll()
  }
}
