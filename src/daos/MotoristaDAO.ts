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
    return await db.motorista.findUnique({
      where: { id },
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
    return await db.motorista.findUnique({
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
    return await db.motorista.findUnique({
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
   * Remove um motorista do banco de dados
   * @param {string} id - ID único do motorista a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.motorista.delete({ where: { id } })
  }

  /**
   * Lista todos os motoristas do banco de dados
   * Ordena por data de criação decrescente (mais recentes primeiro)
   * @returns {Promise<MotoristaCompletions[]>} Lista de todos os motoristas ordenados
   */
  async findAll(): Promise<MotoristaCompletions[]> {
    return await db.motorista.findMany({
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
