import { db } from '@/database/prisma'
import type { ManutencaoCreateDTO } from '@/dtos/create'
import type { ManutencaoUpdateDTO } from '@/dtos/update'
import type { ManutencaoEspecialidadeTipo } from '@/enums'
import {
  generateDataManutencaoCreate,
  generateDataManutencaoUpdate
} from '@/helpers'
import type { IManutencaoAccess } from '@/interfaces/access'
import type { ManutencaoCompletions } from '@/types'

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
    return await db.manutencao.findFirst({
      where: { id, deletadoEm: null },
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
    return await db.manutencao.findFirst({
      where: { email, deletadoEm: null },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Busca uma manutenção por email incluindo deletados
   * @param {string} email - Email único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<ManutencaoCompletions | null> {
    return await db.manutencao.findFirst({
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
      where: { telefone, deletadoEm: null },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Busca uma manutenção por telefone incluindo deletados
   * @param {string} telefone - Telefone único da manutenção
   * @returns {Promise<ManutencaoCompletions | null>} Manutenção encontrada ou null
   */
  async findByTelefoneIncludingDeleted(
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
    const manutencaoExistente = await db.manutencao.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!manutencaoExistente) {
      throw new Error('Manutenção não encontrada ou já deletada.')
    }

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
   * Remove uma manutenção do banco de dados (soft delete)
   * @param {string} id - ID único da manutenção a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.manutencao.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura uma manutenção soft-deleted
   * @param {string} id - ID único da manutenção a ser restaurada
   * @returns {Promise<ManutencaoCompletions>} Manutenção restaurada
   */
  async restore(id: string): Promise<ManutencaoCompletions> {
    return await db.manutencao.update({
      where: { id },
      data: { deletadoEm: null },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Restaura e atualiza uma manutenção soft-deleted
   * @param {string} id - ID da manutenção a ser restaurada e atualizada
   * @param {ManutencaoCreateDTO} manutencaoData - Dados da manutenção para atualização
   * @returns {Promise<ManutencaoCompletions>} Manutenção restaurada e atualizada
   */
  async restoreAndUpdate(
    id: string,
    manutencaoData: ManutencaoCreateDTO
  ): Promise<ManutencaoCompletions> {
    // Buscar manutenção existente para verificar se tem endereco/fotos/logo/especialidades
    const manutencaoExistente = await db.manutencao.findUnique({
      where: { id },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })

    if (!manutencaoExistente) {
      throw new Error('Manutenção não encontrada.')
    }

    // Deletar dados relacionados antigos se existirem
    if (manutencaoExistente.endereco) {
      await db.endereco.delete({
        where: { id: manutencaoExistente.endereco.id }
      })
    }
    if (manutencaoExistente.fotos && manutencaoExistente.fotos.length > 0) {
      await db.foto.deleteMany({
        where: {
          id: { in: manutencaoExistente.fotos.map((foto) => foto.id) }
        }
      })
    }
    if (manutencaoExistente.logo) {
      await db.foto.delete({ where: { id: manutencaoExistente.logo.id } })
    }
    if (
      manutencaoExistente.especialidades &&
      manutencaoExistente.especialidades.length > 0
    ) {
      await db.manutencaoEspecialidade.deleteMany({
        where: {
          id: { in: manutencaoExistente.especialidades.map((esp) => esp.id) }
        }
      })
    }

    const dataToUpdate = generateDataManutencaoCreate(manutencaoData)

    return await db.manutencao.update({
      where: { id },
      data: {
        ...dataToUpdate,
        deletadoEm: null
      },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        especialidades: true
      }
    })
  }

  /**
   * Lista todas as manutenções do banco de dados
   * @returns {Promise<ManutencaoCompletions[]>} Lista de todas as manutenções com suas relações
   */
  async findAll(): Promise<ManutencaoCompletions[]> {
    return await db.manutencao.findMany({
      where: { deletadoEm: null },
      orderBy: { criadoEm: 'desc' },
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
   * @param {ManutencaoEspecialidadeTipo} especialidade - Tipo da especialidade
   * @returns {Promise<ManutencaoCompletions[]>} Lista de manutenções com a especialidade
   */
  async findByEspecialidade(
    especialidade: ManutencaoEspecialidadeTipo
  ): Promise<ManutencaoCompletions[]> {
    return await db.manutencao.findMany({
      where: {
        deletadoEm: null,
        especialidades: {
          some: {
            tipo: especialidade
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
