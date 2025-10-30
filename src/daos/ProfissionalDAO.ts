import { db } from '@/database/prisma'
import type { ProfissionalCreateDTO } from '@/dtos/create'
import type { ProfissionalUpdateDTO } from '@/dtos/update'
import {
  generateDataProfissionalCreate,
  generateDataProfissionalUpdate
} from '@/helpers'
import type { IProfissionalAccess } from '@/interfaces/access'
import type { ProfissionalCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de profissionais no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 */
export class ProfissionalDAO implements IProfissionalAccess {
  /**
   * Cria um novo profissional no banco de dados
   * @param {ProfissionalCreateDTO} data - Dados do profissional a ser criado
   * @returns {Promise<ProfissionalCompletions>} Profissional criado
   */
  async create(data: ProfissionalCreateDTO): Promise<ProfissionalCompletions> {
    const dataToCreate = generateDataProfissionalCreate(data)

    const profissional = await db.profissional.create({
      data: dataToCreate,
      include: {
        foto: true
      }
    })

    return profissional
  }

  /**
   * Busca um profissional por ID no banco de dados
   * @param {string} id - ID único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findById(id: string): Promise<ProfissionalCompletions | null> {
    return await db.profissional.findUnique({
      where: { id },
      include: {
        foto: true
      }
    })
  }

  /**
   * Busca um profissional por email no banco de dados
   * @param {string} email - Email único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findByEmail(email: string): Promise<ProfissionalCompletions | null> {
    return await db.profissional.findUnique({
      where: { email },
      include: {
        foto: true
      }
    })
  }

  /**
   * Busca um profissional por telefone no banco de dados
   * @param {string} telefone - Telefone único do profissional
   * @returns {Promise<ProfissionalCompletions | null>} Profissional encontrado ou null
   */
  async findByTelefone(
    telefone: string
  ): Promise<ProfissionalCompletions | null> {
    return await db.profissional.findUnique({
      where: { telefone },
      include: {
        foto: true
      }
    })
  }

  /**
   * Atualiza os dados de um profissional no banco de dados
   * @param {string} id - ID único do profissional
   * @param {ProfissionalUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ProfissionalCompletions>} Profissional atualizado
   */
  async update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions> {
    const dataToUpdate = await generateDataProfissionalUpdate(data, id)

    const profissional = await db.profissional.update({
      where: { id },
      data: dataToUpdate,
      include: {
        foto: true
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
   * @returns {Promise<ProfissionalCompletions[]>} Lista de todos os profissionais com suas relações
   */
  async findAll(): Promise<ProfissionalCompletions[]> {
    return await db.profissional.findMany({
      include: {
        foto: true
      },
      orderBy: {
        nome: 'asc'
      }
    })
  }
}
