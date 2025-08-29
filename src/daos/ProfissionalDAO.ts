import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'
import {
  generateDataProfissionalCreate,
  generateDataProfissionalUpdate
} from '../helpers/generateDataProfissional'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { db } from '../lib/prisma'
import { ProfissionalCompletions } from '../types/ProfissionalTypes'

export class ProfissionalDAO implements IProfissionalAccess {
  async create(data: ProfissionalCreateDTO): Promise<ProfissionalCompletions> {
    const dataToCreate = generateDataProfissionalCreate(data)

    const profissional = await db.profissional.create({
      data: dataToCreate,
      include: {
        comentarios: {
          include: {
            likesUsuarios: true
          }
        }
      }
    })

    return profissional
  }

  async findById(id: string): Promise<ProfissionalCompletions | null> {
    return await db.profissional.findUnique({
      where: { id },
      include: {
        comentarios: {
          orderBy: {
            criadoEm: 'desc'
          },
          include: {
            likesUsuarios: true
          }
        }
      }
    })
  }

  async findByEmail(email: string): Promise<ProfissionalCompletions | null> {
    return await db.profissional.findUnique({
      where: { email },
      include: {
        comentarios: {
          orderBy: {
            criadoEm: 'desc'
          },
          include: {
            likesUsuarios: true
          }
        }
      }
    })
  }

  async findByTelefone(
    telefone: string
  ): Promise<ProfissionalCompletions | null> {
    return await db.profissional.findUnique({
      where: { telefone },
      include: {
        comentarios: {
          orderBy: {
            criadoEm: 'desc'
          },
          include: {
            likesUsuarios: true
          }
        }
      }
    })
  }

  async update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions> {
    const dataToUpdate = generateDataProfissionalUpdate(data)

    const profissional = await db.profissional.update({
      where: { id },
      data: dataToUpdate,
      include: {
        comentarios: {
          orderBy: {
            criadoEm: 'desc'
          },
          include: {
            likesUsuarios: true
          }
        }
      }
    })

    return profissional
  }

  async delete(id: string): Promise<void> {
    await db.profissional.delete({ where: { id } })
  }

  async findAll(): Promise<ProfissionalCompletions[]> {
    return await db.profissional.findMany({
      include: {
        comentarios: {
          orderBy: {
            criadoEm: 'desc'
          },
          include: {
            likesUsuarios: true
          }
        }
      },
      orderBy: {
        nome: 'asc'
      }
    })
  }
}
