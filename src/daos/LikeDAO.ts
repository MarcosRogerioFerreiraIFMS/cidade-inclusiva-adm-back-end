import { db } from '@/database/prisma'
import type { LikeCreateDTO } from '@/dtos/create'
import { generateDataLikeCreate } from '@/helpers'
import type { ILikeAccess } from '@/interfaces/access'
import type { LikeCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de likes no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * Implementa operações específicas para a entidade Like com chave composta
 */
export class LikeDAO implements ILikeAccess {
  /**
   * Cria um novo like no banco de dados
   * @param {LikeCreateDTO} data - Dados do like a ser criado
   * @returns {Promise<LikeCompletions>} Like criado
   */
  async create(data: LikeCreateDTO): Promise<LikeCompletions> {
    const dataToCreate = generateDataLikeCreate(data)
    return await db.like.create({
      data: dataToCreate
    })
  }

  /**
   * Busca um like por ID no banco de dados
   * @param {string} id - ID único do like
   * @returns {Promise<LikeCompletions | null>} Like encontrado ou null
   */
  async findById(id: string): Promise<LikeCompletions | null> {
    return await db.like.findUnique({
      where: { id }
    })
  }

  /**
   * Busca um like específico entre usuário e comentário
   * Utiliza chave composta para encontrar like único
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeCompletions | null>} Like encontrado ou null
   */
  async findByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<LikeCompletions | null> {
    return await db.like.findUnique({
      where: {
        usuarioId_comentarioId: {
          usuarioId,
          comentarioId
        }
      }
    })
  }

  /**
   * Remove um like por ID do banco de dados
   * @param {string} id - ID único do like a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.like.delete({
      where: { id }
    })
  }

  /**
   * Remove um like específico entre usuário e comentário
   * Utiliza chave composta para remoção precisa
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<void>}
   */
  async deleteByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<void> {
    await db.like.delete({
      where: {
        usuarioId_comentarioId: {
          usuarioId,
          comentarioId
        }
      }
    })
  }

  /**
   * Lista todos os likes de um comentário específico
   * Exclui likes de usuários que foram deletados (soft delete)
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeCompletions[]>} Lista de likes do comentário (apenas de usuários ativos)
   */
  async findByComentario(comentarioId: string): Promise<LikeCompletions[]> {
    return await db.like.findMany({
      where: {
        comentarioId,
        usuario: {
          deletadoEm: null
        }
      }
    })
  }

  /**
   * Lista todos os likes dados por um usuário específico
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<LikeCompletions[]>} Lista de likes do usuário
   */
  async findByUsuario(usuarioId: string): Promise<LikeCompletions[]> {
    return await db.like.findMany({
      where: { usuarioId }
    })
  }

  /**
   * Conta o número total de likes de um comentário
   * Utilizado para estatísticas e contadores
   * Exclui likes de usuários que foram deletados (soft delete)
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<number>} Número total de likes no comentário (apenas de usuários ativos)
   */
  async countByComentario(comentarioId: string): Promise<number> {
    return await db.like.count({
      where: {
        comentarioId,
        usuario: {
          deletadoEm: null
        }
      }
    })
  }

  /**
   * Verifica se um usuário é o proprietário de um like
   * Utilizado para validações de autorização
   * @param {string} likeId - ID do like
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} true se o usuário é o proprietário, false caso contrário
   */
  async isLikeOwner(likeId: string, userId: string): Promise<boolean> {
    const like = await db.like.findUnique({
      where: { id: likeId },
      select: { usuarioId: true }
    })
    return like?.usuarioId === userId
  }
}
