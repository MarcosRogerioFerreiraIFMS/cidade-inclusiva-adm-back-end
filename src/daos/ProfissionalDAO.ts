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
    try {
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
    } catch (error) {
      console.error('Erro ao criar profissional:', error)
      throw error
    }
  }

  async findById(id: string): Promise<ProfissionalCompletions | null> {
    try {
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
    } catch (error) {
      console.error('Erro ao buscar profissional por ID:', error)
      throw error
    }
  }

  async findByEmail(email: string): Promise<ProfissionalCompletions | null> {
    try {
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
    } catch (error) {
      console.error('Erro ao buscar profissional por email:', error)
      throw error
    }
  }

  async findByTelefone(
    telefone: string
  ): Promise<ProfissionalCompletions | null> {
    try {
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
    } catch (error) {
      console.error('Erro ao buscar profissional por telefone:', error)
      throw error
    }
  }

  async update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions> {
    try {
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
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.profissional.delete({ where: { id } })
    } catch (error) {
      console.error('Erro ao deletar profissional:', error)
      throw error
    }
  }

  async findAll(): Promise<ProfissionalCompletions[]> {
    try {
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
    } catch (error) {
      console.error('Erro ao buscar todos os profissionais:', error)
      throw error
    }
  }
}
