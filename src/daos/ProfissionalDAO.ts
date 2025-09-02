import { db } from '../database/prisma'
import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'
import {
  generateDataProfissionalCreate,
  generateDataProfissionalUpdate
} from '../helpers/generateDataProfissional'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { ProfissionalCompletions } from '../types/ProfissionalTypes'

/**
 * DAO (Data Access Object) para operações de profissionais no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Profissional com comentários
 */
export class ProfissionalDAO implements IProfissionalAccess {
  /**
   * Cria um novo profissional no banco de dados
   * @param {ProfissionalCreateDTO} data - Dados do profissional a ser criado
   * @returns {Promise<ProfissionalCompletions>} Profissional criado com comentários e likes
   */
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

  /**
   * Busca um profissional por ID no banco de dados
   * Inclui comentários ordenados por data e seus likes
   * @param {string} id - ID único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
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

  /**
   * Busca um profissional por email no banco de dados
   * Inclui comentários ordenados por data e seus likes
   * @param {string} email - Email único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
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

  /**
   * Busca um profissional por telefone no banco de dados
   * Inclui comentários ordenados por data e seus likes
   * @param {string} telefone - Telefone único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
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

  /**
   * Atualiza os dados de um profissional no banco de dados
   * @param {string} id - ID único do profissional
   * @param {ProfissionalUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ProfissionalCompletions>} Profissional atualizado com comentários e likes
   */
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

  /**
   * Remove um profissional do banco de dados
   * @param {string} id - ID único do profissional a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.profissional.delete({ where: { id } })
  }

  /**
   * Lista todos os profissionais do banco de dados
   * Inclui comentários e likes, ordenados por nome do profissional
   * @returns {Promise<ProfissionalCompletions[]>} Lista de todos os profissionais com suas relações
   */
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
