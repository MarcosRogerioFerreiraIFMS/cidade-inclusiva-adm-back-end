import { db } from '../database/prisma'
import { VeiculoCreateDTO } from '../dtos/create/VeiculoCreateDTO'
import { VeiculoUpdateDTO } from '../dtos/update/VeiculoUpdateDTO'
import {
  generateDataVeiculoCreate,
  generateDataVeiculoUpdate
} from '../helpers/generateDataVeiculo'
import { IVeiculoAccess } from '../interfaces/access/IVeiculoAccess'
import { VeiculoCompletions } from '../types/VeiculoTypes'

/**
 * DAO (Data Access Object) para operações de veículos no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Veiculo
 */
export class VeiculoDAO implements IVeiculoAccess {
  /**
   * Cria um novo veículo no banco de dados
   * @param {VeiculoCreateDTO} data - Dados do veículo a ser criado
   * @returns {Promise<VeiculoCompletions>} Veículo criado
   */
  async create(data: VeiculoCreateDTO): Promise<VeiculoCompletions> {
    const dataToCreate = generateDataVeiculoCreate(data)

    const veiculo = await db.veiculo.create({
      data: dataToCreate,
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })

    return veiculo
  }

  /**
   * Busca um veículo por ID no banco de dados
   * @param {string} id - ID único do veículo
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findById(id: string): Promise<VeiculoCompletions | null> {
    return await db.veiculo.findUnique({
      where: { id },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }

  /**
   * Busca um veículo por placa no banco de dados
   * @param {string} placa - Placa do veículo
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findByPlaca(placa: string): Promise<VeiculoCompletions | null> {
    return await db.veiculo.findUnique({
      where: { placa },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }

  /**
   * Busca um veículo por ID do motorista no banco de dados
   * @param {string} motoristaId - ID do motorista
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findByMotoristaId(
    motoristaId: string
  ): Promise<VeiculoCompletions | null> {
    return await db.veiculo.findUnique({
      where: { motoristaId },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }

  /**
   * Atualiza os dados de um veículo no banco de dados
   * @param {string} id - ID único do veículo
   * @param {VeiculoUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<VeiculoCompletions>} Veículo atualizado
   */
  async update(
    id: string,
    data: VeiculoUpdateDTO
  ): Promise<VeiculoCompletions> {
    const dataToUpdate = await generateDataVeiculoUpdate(data, id)

    const veiculo = await db.veiculo.update({
      where: { id },
      data: dataToUpdate,
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })

    return veiculo
  }

  /**
   * Remove um veículo do banco de dados
   * @param {string} id - ID único do veículo a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.veiculo.delete({ where: { id } })
  }

  /**
   * Lista todos os veículos do banco de dados
   * Ordena por data de criação decrescente (mais recentes primeiro)
   * @returns {Promise<VeiculoCompletions[]>} Lista de todos os veículos ordenados
   */
  async findAll(): Promise<VeiculoCompletions[]> {
    return await db.veiculo.findMany({
      orderBy: {
        criadoEm: 'desc'
      },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }
}
