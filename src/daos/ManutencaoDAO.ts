import { db } from '@/database/prisma'
import { ManutencaoCreateDTO } from '@/dtos/create'
import { ManutencaoUpdateDTO } from '@/dtos/update'
import {
  generateDataManutencaoCreate,
  generateDataManutencaoUpdate
} from '@/helpers'
import { IManutencaoAccess } from '@/interfaces/access'
import { ManutencaoCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de manutenções no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 */
export class ManutencaoDAO implements IManutencaoAccess {
  /**
   * Cria uma nova manutenção no banco de dados
   * @param {ManutencaoCreateDTO} data - Dados da manutenção a ser criada
   * @returns {Promise<ManutencaoCompletions>} Manutenção criada com todas as relações
   */
  async create(data: ManutencaoCreateDTO): Promise<ManutencaoCompletions> {
    const dataToCreate = generateDataManutencaoCreate(data)
    return await db.manutencao.create({
      data: dataToCreate,
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Busca uma manutenção por ID no banco de dados
   * @param {string} id - ID único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findById(id: string): Promise<ManutencaoCompletions | null> {
    return await db.manutencao.findUnique({
      where: { id },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Busca uma manutenção por email no banco de dados
   * @param {string} email - Email único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByEmail(email: string): Promise<ManutencaoCompletions | null> {
    return await db.manutencao.findUnique({
      where: { email },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Busca uma manutenção por telefone no banco de dados
   * @param {string} telefone - Telefone único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByTelefone(
    telefone: string
  ): Promise<ManutencaoCompletions | null> {
    return await db.manutencao.findFirst({
      where: { telefone },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Atualiza os dados de uma manutenção no banco de dados
   * @param {string} id - ID único da manutenção
   * @param {ManutencaoUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ManutencaoCompletions>} Manutenção atualizada com todas as relações
   */
  async update(
    id: string,
    data: ManutencaoUpdateDTO
  ): Promise<ManutencaoCompletions> {
    const dataToUpdate = await generateDataManutencaoUpdate(data, id)

    return await db.manutencao.update({
      where: { id },
      data: dataToUpdate,
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Remove uma manutenção do banco de dados
   * @param {string} id - ID único da manutenção a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.manutencao.delete({
      where: { id }
    })
  }

  /**
   * Lista todas as manutenções do banco de dados
   * @returns {Promise<ManutencaoCompletions[]>} Lista de todas as manutenções com suas relações
   */
  async findAll(): Promise<ManutencaoCompletions[]> {
    return await db.manutencao.findMany({
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Busca manutenções por especialidade no banco de dados
   * @param {string} especialidade - Nome da especialidade
   * @returns {Promise<ManutencaoCompletions[]>} Lista de manutenções com a especialidade
   */
  async findByEspecialidade(
    especialidade: string
  ): Promise<ManutencaoCompletions[]> {
    return await db.manutencao.findMany({
      where: {
        especialidades: {
          some: {
            nome: {
              contains: especialidade
            }
          }
        }
      },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }
}
