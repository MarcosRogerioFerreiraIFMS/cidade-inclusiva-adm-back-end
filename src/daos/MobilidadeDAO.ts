import { db } from '@/database/prisma'
import type { MobilidadeCreateDTO } from '@/dtos/create'
import type { MobilidadeUpdateDTO } from '@/dtos/update'
import type { StatusMobilidade } from '@/enums'
import {
  generateDataMobilidadeCreate,
  generateDataMobilidadeUpdate
} from '@/helpers'
import type { IMobilidadeAccess } from '@/interfaces/access'
import type { MobilidadeCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de mobilidade no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Mobilidade
 */
export class MobilidadeDAO implements IMobilidadeAccess {
  /**
   * Cria uma nova mobilidade no banco de dados
   * @param {MobilidadeCreateDTO} data - Dados da mobilidade a ser criada
   * @param {string} userId - ID do usuário que está criando a mobilidade
   * @returns {Promise<MobilidadeCompletions>} Mobilidade criada
   */
  async create(
    data: MobilidadeCreateDTO,
    userId: string
  ): Promise<MobilidadeCompletions> {
    const dataToCreate = generateDataMobilidadeCreate(data, userId)

    const mobilidade = await db.mobilidade.create({
      data: dataToCreate,
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
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
    return await db.mobilidade.findFirst({
      where: { id, deletadoEm: null },
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
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
    const mobilidadeExistente = await db.mobilidade.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!mobilidadeExistente) {
      throw new Error('Mobilidade não encontrada ou já deletada.')
    }

    const dataToUpdate = generateDataMobilidadeUpdate(data)

    const mobilidade = await db.mobilidade.update({
      where: { id },
      data: dataToUpdate,
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
      }
    })

    return mobilidade
  }

  /**
   * Remove uma mobilidade do banco de dados (soft delete)
   * @param {string} id - ID único da mobilidade a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.mobilidade.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura uma mobilidade soft-deleted
   * @param {string} id - ID único da mobilidade a ser restaurada
   * @returns {Promise<MobilidadeCompletions>} Mobilidade restaurada
   */
  async restore(id: string): Promise<MobilidadeCompletions> {
    return await db.mobilidade.update({
      where: { id },
      data: { deletadoEm: null },
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
      }
    })
  }

  /**
   * Lista todas as mobilidades do banco de dados
   * Ordena por data de registro decrescente (mais recentes primeiro)
   * @returns {Promise<MobilidadeCompletions[]>} Lista de todas as mobilidades ordenadas
   */
  async findAll(): Promise<MobilidadeCompletions[]> {
    return await db.mobilidade.findMany({
      where: { deletadoEm: null },
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
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
      where: { usuarioId, deletadoEm: null },
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
      },
      orderBy: {
        dataRegistro: 'desc'
      }
    })
  }

  /**
   * Busca mobilidades por status
   * @param {StatusMobilidade} status - Status das mobilidades
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades com o status especificado
   */
  async findByStatus(
    status: StatusMobilidade
  ): Promise<MobilidadeCompletions[]> {
    return await db.mobilidade.findMany({
      where: { status, deletadoEm: null },
      include: {
        usuario: {
          where: { deletadoEm: null },
          include: { foto: true }
        }
      },
      orderBy: {
        dataRegistro: 'desc'
      }
    })
  }
}
