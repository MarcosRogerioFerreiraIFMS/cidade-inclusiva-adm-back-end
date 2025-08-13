import { Profissional } from '@prisma/client'
import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'
import {
  generateDataProfissionalCreate,
  generateDataProfissionalUpdate
} from '../helpers/generateDataProfissional'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { db } from '../lib/prisma'

export class ProfissionalDAO implements IProfissionalAccess {
  async create(data: ProfissionalCreateDTO): Promise<Profissional> {
    try {
      const dataToCreate = generateDataProfissionalCreate(data)

      const profissional = await db.profissional.create({
        data: dataToCreate,
        include: {
          comentarios: true
        }
      })

      return profissional
    } catch (error) {
      console.error('Erro ao criar profissional:', error)
      throw error
    }
  }

  async findById(id: string): Promise<Profissional | null> {
    try {
      return await db.profissional.findUnique({
        where: { id },
        include: {
          comentarios: {
            where: {
              visivel: true
            },
            orderBy: {
              criadoEm: 'desc'
            }
          }
        }
      })
    } catch (error) {
      console.error('Erro ao buscar profissional por ID:', error)
      throw error
    }
  }

  async findByEmail(email: string): Promise<Profissional | null> {
    try {
      return await db.profissional.findUnique({
        where: { email }
      })
    } catch (error) {
      console.error('Erro ao buscar profissional por email:', error)
      throw error
    }
  }

  async update(id: string, data: ProfissionalUpdateDTO): Promise<Profissional> {
    try {
      const dataToUpdate = generateDataProfissionalUpdate(data)

      const profissional = await db.profissional.update({
        where: { id },
        data: dataToUpdate,
        include: {
          comentarios: {
            where: {
              visivel: true
            },
            orderBy: {
              criadoEm: 'desc'
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

  async findAll(): Promise<Profissional[]> {
    try {
      return await db.profissional.findMany({
        include: {
          comentarios: {
            where: {
              visivel: true
            },
            orderBy: {
              criadoEm: 'desc'
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
