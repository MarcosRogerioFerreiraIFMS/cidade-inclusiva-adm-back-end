import { db } from '../database/prisma'
import { ComentarioCreateRelationalDTO } from '../dtos/create'
import { ComentarioUpdateDTO } from '../dtos/update'
import {
  generateDataComentarioCreate,
  generateDataComentarioUpdate
} from '../helpers'
import { IComentarioAccess } from '../interfaces/access'
import { ComentarioCompletions } from '../types'

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
      include: { likesUsuarios: true }
    })
  }

  /**
   * Busca um comentário por ID no banco de dados
   * Inclui informações dos likes do comentário
   * @param {string} id - ID único do comentário
   * @returns {Promise<ComentarioCompletions | null>} Comentário encontrado ou null
   */
  async findById(id: string): Promise<ComentarioCompletions | null> {
    return await db.comentario.findUnique({
      where: { id },
      include: { likesUsuarios: true }
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
    const dataToUpdate = generateDataComentarioUpdate(data)
    return await db.comentario.update({
      where: { id },
      include: { likesUsuarios: true },
      data: dataToUpdate
    })
  }

  /**
   * Remove um comentário do banco de dados
   * @param {string} id - ID único do comentário a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.comentario.delete({
      where: { id }
    })
  }

  /**
   * Lista todos os comentários do banco de dados
   * Ordena por data de criação decrescente e inclui likes
   * @returns {Promise<ComentarioCompletions[]>} Lista de todos os comentários com likes
   */
  async findAll(): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }

  async findVisible(): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: { visivel: true },
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }

  /**
   * Lista todos os comentários de um profissional específico
   * Inclui comentários visíveis e ocultos, ordenados por data
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários do profissional
   */
  async findByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: { profissionalId },
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }

  /**
   * Lista apenas os comentários visíveis de um profissional específico
   * Filtra comentários marcados como visíveis para exibição pública
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários visíveis do profissional
   */
  async findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: {
        profissionalId,
        visivel: true
      },
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
    })
  }

  /**
   * Lista todos os comentários de um usuário específico
   * Ordena por data de criação decrescente e inclui likes
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários do usuário
   */
  async findByUsuario(usuarioId: string): Promise<ComentarioCompletions[]> {
    return await db.comentario.findMany({
      where: { usuarioId },
      orderBy: { criadoEm: 'desc' },
      include: { likesUsuarios: true }
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
    const comment = await db.comentario.findUnique({
      where: { id: commentId },
      select: { usuarioId: true }
    })
    return comment?.usuarioId === userId
  }
}
