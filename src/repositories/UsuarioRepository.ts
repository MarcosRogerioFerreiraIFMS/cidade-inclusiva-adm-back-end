import { UsuarioCreateDTO } from '../dtos/create/UsuarioCreateDTO'
import { UsuarioUpdateDTO } from '../dtos/update/UsuarioUpdateDTO'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { UsuarioCompletions } from '../types/UsuarioTypes'

export class UsuarioRepository implements IUsuarioAccess {
  private dao: IUsuarioAccess

  constructor(dao: IUsuarioAccess) {
    this.dao = dao
  }

  async create(data: UsuarioCreateDTO): Promise<UsuarioCompletions> {
    return await this.dao.create(data)
  }

  async findById(id: string): Promise<UsuarioCompletions | null> {
    return await this.dao.findById(id)
  }

  async findByEmail(email: string): Promise<UsuarioCompletions | null> {
    return await this.dao.findByEmail(email)
  }

  async findByTelefone(telefone: string): Promise<UsuarioCompletions | null> {
    return await this.dao.findByTelefone(telefone)
  }

  async update(
    id: string,
    data: UsuarioUpdateDTO
  ): Promise<UsuarioCompletions> {
    return (await this.dao.update(id, data)) as UsuarioCompletions
  }

  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  async findAll(): Promise<UsuarioCompletions[]> {
    return (await this.dao.findAll()) as UsuarioCompletions[]
  }
}
