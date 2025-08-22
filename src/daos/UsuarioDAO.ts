import { UsuarioCreateDTO } from '../dtos/create/UsuarioCreateDTO'
import { UsuarioUpdateDTO } from '../dtos/update/UsuarioUpdateDTO'
import {
  generateDataUsuarioCreate,
  generateDataUsuarioUpdate
} from '../helpers/generateDataUsuario'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { db } from '../lib/prisma'
import { UsuarioCompletions } from '../types/UsuarioTypes'

export class UsuarioDAO implements IUsuarioAccess {
  async create(data: UsuarioCreateDTO): Promise<UsuarioCompletions> {
    const dataToCreate = generateDataUsuarioCreate(data)
    return await db.usuario.create({
      data: dataToCreate,
      include: {
        endereco: true
      }
    })
  }

  async findById(id: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { id },
      include: {
        endereco: true
      }
    })
  }

  async findByEmail(email: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { email },
      include: {
        endereco: true
      }
    })
  }

  async findByTelefone(telefone: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { telefone },
      include: {
        endereco: true
      }
    })
  }

  async update(
    id: string,
    data: UsuarioUpdateDTO
  ): Promise<UsuarioCompletions> {
    const dataToUpdate = generateDataUsuarioUpdate(data)

    return await db.usuario.update({
      where: { id },
      data: dataToUpdate,
      include: {
        endereco: true
      }
    })
  }

  async delete(id: string): Promise<void> {
    await db.usuario.delete({
      where: { id }
    })
  }

  async findAll(): Promise<UsuarioCompletions[]> {
    return await db.usuario.findMany({
      include: {
        endereco: true
      }
    })
  }
}
