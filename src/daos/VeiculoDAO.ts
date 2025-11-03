import { db } from '@/database/prisma'
import type { VeiculoCreateDTO } from '@/dtos/create'
import type { VeiculoUpdateDTO } from '@/dtos/update'
import { generateDataVeiculoCreate, generateDataVeiculoUpdate } from '@/helpers'
import type { IVeiculoAccess } from '@/interfaces/access'
import type { VeiculoCompletions } from '@/types'

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
    return await db.veiculo.findFirst({
      where: { id, deletadoEm: null },
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
    return await db.veiculo.findFirst({
      where: { placa, deletadoEm: null },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }

  /**
   * Busca um veículo por placa incluindo deletados
   * @param {string} placa - Placa do veículo
   * @returns {Promise<VeiculoCompletions | null>} Veículo encontrado ou null
   */
  async findByPlacaIncludingDeleted(
    placa: string
  ): Promise<VeiculoCompletions | null> {
    return await db.veiculo.findFirst({
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
    return await db.veiculo.findFirst({
      where: { motoristaId, deletadoEm: null },
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
    const veiculoExistente = await db.veiculo.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!veiculoExistente) {
      throw new Error('Veículo não encontrado ou já deletado.')
    }

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
   * Remove um veículo do banco de dados (soft delete)
   * @param {string} id - ID único do veículo a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.veiculo.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura um veículo soft-deleted
   * @param {string} id - ID único do veículo a ser restaurado
   * @returns {Promise<VeiculoCompletions>} Veículo restaurado
   */
  async restore(id: string): Promise<VeiculoCompletions> {
    return await db.veiculo.update({
      where: { id },
      data: { deletadoEm: null },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }

  /**
   * Restaura e atualiza um veículo soft-deleted
   * @param {string} id - ID do veículo a ser restaurado e atualizado
   * @param {VeiculoCreateDTO} veiculoData - Dados do veículo para atualização
   * @returns {Promise<VeiculoCompletions>} Veículo restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    veiculoData: VeiculoCreateDTO
  ): Promise<VeiculoCompletions> {
    // Buscar veículo existente para verificar se tem fotos
    const veiculoExistente = await db.veiculo.findUnique({
      where: { id },
      include: { fotos: true }
    })

    if (!veiculoExistente) {
      throw new Error('Veículo não encontrado.')
    }

    // Deletar fotos antigas se existirem
    if (veiculoExistente.fotos && veiculoExistente.fotos.length > 0) {
      await db.foto.deleteMany({
        where: {
          id: { in: veiculoExistente.fotos.map((foto) => foto.id) }
        }
      })
    }

    const dataToUpdate = generateDataVeiculoCreate(veiculoData)

    return await db.veiculo.update({
      where: { id },
      data: {
        ...dataToUpdate,
        deletadoEm: null
      },
      include: {
        motorista: {
          include: { foto: true }
        },
        fotos: true
      }
    })
  }

  /**
   * Lista todos os veículos do banco de dados
   * Ordena por data de criação decrescente (mais recentes primeiro)
   * @returns {Promise<VeiculoCompletions[]>} Lista de todos os veículos ordenados
   */
  async findAll(): Promise<VeiculoCompletions[]> {
    return await db.veiculo.findMany({
      where: { deletadoEm: null },
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
