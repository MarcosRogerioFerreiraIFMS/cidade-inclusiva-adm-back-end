import { db } from '@/database/prisma'
import type { AcessibilidadeUrbanaCreateDTO } from '@/dtos/create'
import type { AcessibilidadeUrbanaUpdateDTO } from '@/dtos/update'
import type { CategoriaAcessibilidadeUrbana } from '@/enums'
import {
  generateDataAcessibilidadeUrbanaCreate,
  generateDataAcessibilidadeUrbanaUpdate
} from '@/helpers'
import type { IAcessibilidadeUrbanaAccess } from '@/interfaces/access'
import type { AcessibilidadeUrbanaCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de acessibilidade urbana no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 */
export class AcessibilidadeUrbanaDAO implements IAcessibilidadeUrbanaAccess {
  /**
   * Cria uma nova acessibilidade urbana no banco de dados
   * @param {AcessibilidadeUrbanaCreateDTO} data - Dados da acessibilidade urbana a ser criada
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana criada com todas as relações
   */
  async create(
    data: AcessibilidadeUrbanaCreateDTO
  ): Promise<AcessibilidadeUrbanaCompletions> {
    const dataToCreate = generateDataAcessibilidadeUrbanaCreate(data)
    return await db.acessibilidadeUrbana.create({
      data: dataToCreate,
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Busca uma acessibilidade urbana por ID no banco de dados
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  async findById(id: string): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await db.acessibilidadeUrbana.findUnique({
      where: { id },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Busca uma acessibilidade urbana por email no banco de dados
   * @param {string} email - Email único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  async findByEmail(
    email: string
  ): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await db.acessibilidadeUrbana.findUnique({
      where: { email },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  async findByTelefone(
    telefone: string
  ): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await db.acessibilidadeUrbana.findUnique({
      where: {
        telefone
      },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Atualiza os dados de uma acessibilidade urbana no banco de dados
   * @param {string} id - ID único da acessibilidade urbana
   * @param {AcessibilidadeUrbanaUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana atualizada com todas as relações
   */
  async update(
    id: string,
    data: AcessibilidadeUrbanaUpdateDTO
  ): Promise<AcessibilidadeUrbanaCompletions> {
    const dataToUpdate = await generateDataAcessibilidadeUrbanaUpdate(data, id)

    return await db.acessibilidadeUrbana.update({
      where: { id },
      data: dataToUpdate,
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Remove uma acessibilidade urbana do banco de dados
   * @param {string} id - ID único da acessibilidade urbana a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.acessibilidadeUrbana.delete({
      where: { id }
    })
  }

  /**
   * Lista todas as acessibilidades urbanas do banco de dados
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de todas as acessibilidades urbanas com suas relações
   */
  async findAll(): Promise<AcessibilidadeUrbanaCompletions[]> {
    return await db.acessibilidadeUrbana.findMany({
      orderBy: { criadoEm: 'desc' },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Busca acessibilidades urbanas por categoria
   * @param {string} categoria - Categoria da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de acessibilidades urbanas
   */
  async findByCategoria(
    categoria: CategoriaAcessibilidadeUrbana
  ): Promise<AcessibilidadeUrbanaCompletions[]> {
    return await db.acessibilidadeUrbana.findMany({
      where: {
        categoria
      },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }
}
