import { db } from '@/database/prisma'
import type { MotoristaCreateDTO } from '@/dtos/create'
import type { MotoristaUpdateDTO } from '@/dtos/update'
import {
  generateDataMotoristaCreate,
  generateDataMotoristaUpdate
} from '@/helpers'
import type { IMotoristaAccess } from '@/interfaces/access'
import type { MotoristaCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de motoristas no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Motorista
 */
export class MotoristaDAO implements IMotoristaAccess {
  /**
   * Cria um novo motorista no banco de dados
   * @param {MotoristaCreateDTO} data - Dados do motorista a ser criado
   * @returns {Promise<MotoristaCompletions>} Motorista criado
   */
  async create(data: MotoristaCreateDTO): Promise<MotoristaCompletions> {
    const dataToCreate = generateDataMotoristaCreate(data)

    const motorista = await db.motorista.create({
      data: dataToCreate,
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })

    return motorista
  }

  /**
   * Busca um motorista por ID no banco de dados
   * @param {string} id - ID único do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findById(id: string): Promise<MotoristaCompletions | null> {
    return await db.motorista.findFirst({
      where: { id, deletadoEm: null },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Busca um motorista por telefone no banco de dados
   * @param {string} telefone - Telefone do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByTelefone(telefone: string): Promise<MotoristaCompletions | null> {
    return await db.motorista.findFirst({
      where: { telefone, deletadoEm: null },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Busca um motorista por telefone incluindo deletados
   * @param {string} telefone - Telefone do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<MotoristaCompletions | null> {
    return await db.motorista.findFirst({
      where: { telefone },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Busca um motorista por email no banco de dados
   * @param {string} email - Email do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByEmail(email: string): Promise<MotoristaCompletions | null> {
    return await db.motorista.findFirst({
      where: { email, deletadoEm: null },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Busca um motorista por email incluindo deletados
   * @param {string} email - Email do motorista
   * @returns {Promise<MotoristaCompletions | null>} Motorista encontrado ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<MotoristaCompletions | null> {
    return await db.motorista.findFirst({
      where: { email },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Atualiza os dados de um motorista no banco de dados
   * @param {string} id - ID único do motorista
   * @param {MotoristaUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<MotoristaCompletions>} Motorista atualizado
   */
  async update(
    id: string,
    data: MotoristaUpdateDTO
  ): Promise<MotoristaCompletions> {
    const motoristaExistente = await db.motorista.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!motoristaExistente) {
      throw new Error('Motorista não encontrado ou já deletado.')
    }

    const dataToUpdate = await generateDataMotoristaUpdate(data, id)

    const motorista = await db.motorista.update({
      where: { id },
      data: dataToUpdate,
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })

    return motorista
  }

  /**
   * Remove um motorista do banco de dados (soft delete)
   * @param {string} id - ID único do motorista a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.motorista.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura um motorista soft-deleted
   * @param {string} id - ID único do motorista a ser restaurado
   * @returns {Promise<MotoristaCompletions>} Motorista restaurado
   */
  async restore(id: string): Promise<MotoristaCompletions> {
    return await db.motorista.update({
      where: { id },
      data: { deletadoEm: null },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Restaura e atualiza um motorista soft-deleted com novos dados
   * @param {string} id - ID único do motorista a ser restaurado
   * @param {MotoristaCreateDTO} data - Novos dados do motorista
   * @returns {Promise<MotoristaCompletions>} Motorista restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    data: MotoristaCreateDTO
  ): Promise<MotoristaCompletions> {
    // Buscar motorista existente para verificar se tem foto
    const motoristaExistente = await db.motorista.findUnique({
      where: { id },
      include: { foto: true }
    })

    if (!motoristaExistente) {
      throw new Error('Motorista não encontrado.')
    }

    // Deletar foto antiga se existir
    if (motoristaExistente.foto) {
      await db.foto.delete({
        where: { id: motoristaExistente.foto.id }
      })
    }

    const dataToUpdate = generateDataMotoristaCreate(data)

    return await db.motorista.update({
      where: { id },
      data: {
        ...dataToUpdate,
        deletadoEm: null
      },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }

  /**
   * Lista todos os motoristas do banco de dados
   * Ordena por data de criação decrescente (mais recentes primeiro)
   * @returns {Promise<MotoristaCompletions[]>} Lista de todos os motoristas ordenados
   */
  async findAll(): Promise<MotoristaCompletions[]> {
    return await db.motorista.findMany({
      where: { deletadoEm: null },
      orderBy: {
        criadoEm: 'desc'
      },
      include: {
        foto: true,
        veiculo: {
          include: { fotos: true }
        }
      }
    })
  }
}
