import { db } from '../database/prisma'
import { MobilidadeCreateDTO } from '../dtos/create/MobilidadeCreateDTO'
import { MobilidadeUpdateDTO } from '../dtos/update/MobilidadeUpdateDTO'
import { StatusMobilidade } from '../enums'
import {
  generateDataMobilidadeCreate,
  generateDataMobilidadeUpdate
} from '../helpers/generateDataMobilidade'
import { IMobilidadeAccess } from '../interfaces/access/IMobilidadeAccess'
import { MobilidadeCompletions } from '../types/MobilidadeTypes'

/**
 * DAO (Data Access Object) para operações de mobilidade no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Mobilidade
 */
export class MobilidadeDAO implements IMobilidadeAccess {
  /**
   * Cria uma nova mobilidade no banco de dados
   * @param {MobilidadeCreateDTO} data - Dados da mobilidade a ser criada
   * @returns {Promise<MobilidadeCompletions>} Mobilidade criada
   */
  async create(data: MobilidadeCreateDTO): Promise<MobilidadeCompletions> {
    const dataToCreate = generateDataMobilidadeCreate(data)

    const mobilidade = await db.mobilidade.create({
      data: dataToCreate,
      include: {
        usuario: true
      }
    })

    return mobilidade
  }

  /**
   * Busca uma mobilidade por ID no banco de dados
   * @param {string} id - ID único da mobilidade
   * @returns {Promise<MobilidadeCompletions | null>} Mobilidade encontrada ou null
   */
  async findById(id: string): Promise<MobilidadeCompletions | null> {
    return await db.mobilidade.findUnique({
      where: { id },
      include: {
        usuario: true
      }
    })
  }

  /**
   * Atualiza os dados de uma mobilidade no banco de dados
   * @param {string} id - ID único da mobilidade
   * @param {MobilidadeUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<MobilidadeCompletions>} Mobilidade atualizada
   */
  async update(
    id: string,
    data: MobilidadeUpdateDTO
  ): Promise<MobilidadeCompletions> {
    const dataToUpdate = generateDataMobilidadeUpdate(data)

    const mobilidade = await db.mobilidade.update({
      where: { id },
      data: dataToUpdate,
      include: {
        usuario: true
      }
    })

    return mobilidade
  }

  /**
   * Remove uma mobilidade do banco de dados
   * @param {string} id - ID único da mobilidade a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.mobilidade.delete({ where: { id } })
  }

  /**
   * Lista todas as mobilidades do banco de dados
   * Ordena por data de registro decrescente (mais recentes primeiro)
   * @returns {Promise<MobilidadeCompletions[]>} Lista de todas as mobilidades ordenadas
   */
  async findAll(): Promise<MobilidadeCompletions[]> {
    return await db.mobilidade.findMany({
      include: {
        usuario: true
      },
      orderBy: {
        dataRegistro: 'desc'
      }
    })
  }

  /**
   * Busca mobilidades por usuário
   * @param {string} usuarioId - ID único do usuário
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades do usuário
   */
  async findByUsuario(usuarioId: string): Promise<MobilidadeCompletions[]> {
    return await db.mobilidade.findMany({
      where: { usuarioId },
      include: {
        usuario: true
      },
      orderBy: {
        dataRegistro: 'desc'
      }
    })
  }

  /**
   * Busca mobilidades por status
   * @param {string} status - Status das mobilidades
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades com o status especificado
   */
  async findByStatus(status: string): Promise<MobilidadeCompletions[]> {
    return await db.mobilidade.findMany({
      where: { status: status as StatusMobilidade },
      include: {
        usuario: true
      },
      orderBy: {
        dataRegistro: 'desc'
      }
    })
  }

  /**
   * Verifica se o usuário é proprietário da mobilidade
   * @param {string} mobilidadeId - ID único da mobilidade
   * @param {string} userId - ID único do usuário
   * @returns {Promise<boolean>} True se o usuário for proprietário, false caso contrário
   */
  async isMobilidadeOwner(
    mobilidadeId: string,
    userId: string
  ): Promise<boolean> {
    const mobilidade = await db.mobilidade.findUnique({
      where: { id: mobilidadeId },
      select: { usuarioId: true }
    })

    return mobilidade?.usuarioId === userId
  }
}
