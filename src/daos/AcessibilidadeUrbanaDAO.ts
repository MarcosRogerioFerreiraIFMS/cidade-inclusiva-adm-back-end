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
    return await db.acessibilidadeUrbana.findFirst({
      where: { id, deletadoEm: null },
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
    return await db.acessibilidadeUrbana.findFirst({
      where: { email, deletadoEm: null },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Busca uma acessibilidade urbana por email incluindo deletados
   * @param {string} email - Email único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await db.acessibilidadeUrbana.findFirst({
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
    return await db.acessibilidadeUrbana.findFirst({
      where: {
        telefone,
        deletadoEm: null
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
   * Busca uma acessibilidade urbana por telefone incluindo deletados
   * @param {string} telefone - Telefone único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<AcessibilidadeUrbanaCompletions | null> {
    return await db.acessibilidadeUrbana.findFirst({
      where: { telefone },
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
    const acessibilidadeExistente = await db.acessibilidadeUrbana.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!acessibilidadeExistente) {
      throw new Error('Acessibilidade urbana não encontrada ou já deletada.')
    }

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
   * Remove uma acessibilidade urbana do banco de dados (soft delete)
   * @param {string} id - ID único da acessibilidade urbana a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.acessibilidadeUrbana.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura uma acessibilidade urbana soft-deleted
   * @param {string} id - ID único da acessibilidade urbana a ser restaurada
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana restaurada
   */
  async restore(id: string): Promise<AcessibilidadeUrbanaCompletions> {
    return await db.acessibilidadeUrbana.update({
      where: { id },
      data: { deletadoEm: null },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })
  }

  /**
   * Restaura e atualiza uma acessibilidade urbana soft-deleted
   * @param {string} id - ID da acessibilidade urbana a ser restaurada e atualizada
   * @param {AcessibilidadeUrbanaCreateDTO} acessibilidadeData - Dados da acessibilidade para atualização
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana restaurada e atualizada
   */
  async restoreAndUpdate(
    id: string,
    acessibilidadeData: AcessibilidadeUrbanaCreateDTO
  ): Promise<AcessibilidadeUrbanaCompletions> {
    // Buscar acessibilidade existente para verificar se tem endereco/fotos/logo/recursos
    const acessibilidadeExistente = await db.acessibilidadeUrbana.findUnique({
      where: { id },
      include: {
        endereco: true,
        fotos: true,
        logo: true,
        recursos: true
      }
    })

    if (!acessibilidadeExistente) {
      throw new Error('Acessibilidade urbana não encontrada.')
    }

    // Deletar dados relacionados antigos se existirem
    if (acessibilidadeExistente.endereco) {
      await db.endereco.delete({
        where: { id: acessibilidadeExistente.endereco.id }
      })
    }
    if (
      acessibilidadeExistente.fotos &&
      acessibilidadeExistente.fotos.length > 0
    ) {
      await db.foto.deleteMany({
        where: {
          id: { in: acessibilidadeExistente.fotos.map((foto) => foto.id) }
        }
      })
    }
    if (acessibilidadeExistente.logo) {
      await db.foto.delete({ where: { id: acessibilidadeExistente.logo.id } })
    }
    if (
      acessibilidadeExistente.recursos &&
      acessibilidadeExistente.recursos.length > 0
    ) {
      await db.acessibilidadeUrbanaRecurso.deleteMany({
        where: {
          id: { in: acessibilidadeExistente.recursos.map((rec) => rec.id) }
        }
      })
    }

    const dataToUpdate =
      generateDataAcessibilidadeUrbanaCreate(acessibilidadeData)

    return await db.acessibilidadeUrbana.update({
      where: { id },
      data: {
        ...dataToUpdate,
        deletadoEm: null
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
   * Lista todas as acessibilidades urbanas do banco de dados
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de todas as acessibilidades urbanas com suas relações
   */
  async findAll(): Promise<AcessibilidadeUrbanaCompletions[]> {
    return await db.acessibilidadeUrbana.findMany({
      where: { deletadoEm: null },
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
        categoria,
        deletadoEm: null
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
