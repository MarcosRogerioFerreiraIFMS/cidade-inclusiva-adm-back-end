import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { ProfissionalCompletions } from '../types/ProfissionalTypes'

export class ProfissionalRepository implements IProfissionalAccess {
  private dao: IProfissionalAccess

  constructor(dao: IProfissionalAccess) {
    this.dao = dao
  }

  async create(data: ProfissionalCreateDTO): Promise<ProfissionalCompletions> {
    return await this.dao.create(data)
  }

  async findById(id: string): Promise<ProfissionalCompletions | null> {
    return await this.dao.findById(id)
  }

  async findByEmail(email: string): Promise<ProfissionalCompletions | null> {
    return await this.dao.findByEmail(email)
  }

  async findByTelefone(
    telefone: string
  ): Promise<ProfissionalCompletions | null> {
    return await this.dao.findByTelefone(telefone)
  }

  async update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions> {
    return await this.dao.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async findAll(): Promise<ProfissionalCompletions[]> {
    return await this.dao.findAll()
  }
}
