import { db } from '@/database/prisma'
import type { ComentarioCreateRelationalDTO } from '@/dtos/create'
import type { ComentarioUpdateDTO } from '@/dtos/update'
import {
  generateDataComentarioCreate,
  generateDataComentarioUpdate
} from '@/helpers'
import type { IComentarioAccess } from '@/interfaces/access'
import type { ComentarioCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de comentários no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Comentario com likes
 */
export class ComentarioDAO implements IComentarioAccess {
  /**
   * Cria um novo comentário no banco de dados
   * @param {ComentarioCreateRelationalDTO} data - Dados do comentário com relacionamentos
   * @returns {Promise<ComentarioCompletions>} Comentário criado com likes
   */
  async create(
    data: ComentarioCreateRelationalDTO
  ): Promise<ComentarioCompletions> {
    const dataToCreate = generateDataComentarioCreate(data)
    return await db.comentario.create({
      data: dataToCreate,
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      }
    })
  }

  /**
   * Busca um comentário por ID no banco de dados
   * Inclui informações dos likes do comentário
   * @param {string} id - ID único do comentário
   * @returns {Promise<ComentarioCompletions | null>} Comentário encontrado ou null
   */
  async findById(id: string): Promise<ComentarioCompletions | null> {
    return await db.comentario.findFirst({
      where: { id, deletadoEm: null },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      }
    })
  }

  /**
   * Atualiza os dados de um comentário no banco de dados
   * @param {string} id - ID único do comentário
   * @param {ComentarioUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ComentarioCompletions>} Comentário atualizado com likes
   */
  async update(
    id: string,
    data: ComentarioUpdateDTO
  ): Promise<ComentarioCompletions> {
    const comentarioExistente = await db.comentario.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!comentarioExistente) {
      throw new Error('Comentário não encontrado ou já deletado.')
    }

    const dataToUpdate = generateDataComentarioUpdate(data)
    return await db.comentario.update({
      where: { id },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      },
      data: dataToUpdate
    })
  }

  /**
   * Remove um comentário do banco de dados (soft delete)
   * @param {string} id - ID único do comentário a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.comentario.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura um comentário soft-deleted
   * @param {string} id - ID único do comentário a ser restaurado
   * @returns {Promise<ComentarioCompletions>} Comentário restaurado
   */
  async restore(id: string): Promise<ComentarioCompletions> {
    return await db.comentario.update({
      where: { id },
      data: { deletadoEm: null },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      }
    })
  }

  /**
   * Verifica se um usuário é o proprietário de um comentário
   * Utilizado para validações de autorização
   * @param {string} commentId - ID do comentário
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} true se o usuário é o proprietário, false caso contrário
   */
  async isCommentOwner(commentId: string, userId: string): Promise<boolean> {
    const comment = await db.comentario.findFirst({
      where: { id: commentId, deletadoEm: null },
      select: { autorId: true }
    })
    return comment?.autorId === userId
  }

  /**
   * Busca todos os comentários de um profissional
   * @param {string} profissionalId - ID do profissional
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByProfissionalId(
    profissionalId: string,
    includeInvisible: boolean = false
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        profissionalId,
        deletadoEm: null,
        ...(includeInvisible ? {} : { visivel: true })
      },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    })
  }

  /**
   * Busca todos os comentários de um motorista
   * @param {string} motoristaId - ID do motorista
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByMotoristaId(
    motoristaId: string,
    includeInvisible: boolean = false
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        motoristaId,
        deletadoEm: null,
        ...(includeInvisible ? {} : { visivel: true })
      },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    })
  }

  /**
   * Busca todos os comentários de uma manutenção
   * @param {string} manutencaoId - ID da manutenção
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByManutencaoId(
    manutencaoId: string,
    includeInvisible: boolean = false
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        manutencaoId,
        deletadoEm: null,
        ...(includeInvisible ? {} : { visivel: true })
      },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    })
  }

  /**
   * Busca todos os comentários de uma acessibilidade urbana
   * @param {string} acessibilidadeUrbanaId - ID da acessibilidade urbana
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByAcessibilidadeUrbanaId(
    acessibilidadeUrbanaId: string,
    includeInvisible: boolean = false
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        acessibilidadeUrbanaId,
        deletadoEm: null,
        ...(includeInvisible ? {} : { visivel: true })
      },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    })
  }

  /**
   * Busca todos os comentários feitos por um usuário
   * @param {string} usuarioId - ID do usuário
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByUsuarioId(
    usuarioId: string,
    includeInvisible: boolean = false
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        autorId: usuarioId,
        deletadoEm: null,
        ...(includeInvisible ? {} : { visivel: true })
      },
      include: {
        autor: { include: { foto: true } },
        likesUsuarios: {
          where: { usuario: { deletadoEm: null } },
          include: { usuario: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    })
  }
}
