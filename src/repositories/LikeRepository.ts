import type { LikeCreateDTO } from '@/dtos/create'
import type { ILikeAccess } from '@/interfaces/access'
import type { LikeCompletions } from '@/types'

/**
 * - Repository para operações de likes:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * - Responsável por coordenar operações de likes entre usuários e comentários
 */
export class LikeRepository implements ILikeAccess {
  /** DAO de likes injetado para acesso aos dados */
  private dao: ILikeAccess

  /**
   * Construtor do repository de likes
   * @param {ILikeAccess} dao - DAO de likes para acesso aos dados
   */
  constructor(dao: ILikeAccess) {
    this.dao = dao
  }

  /**
   * Cria um novo like
   * @param {LikeCreateDTO} data - Dados do like a ser criado
   * @returns {Promise<LikeCompletions>} Like criado com todas as relações
   */
  async create(data: LikeCreateDTO): Promise<LikeCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca um like por ID
   * @param {string} id - ID único do like
   * @returns {Promise<LikeCompletions | null>} Like encontrado ou null
   */
  async findById(id: string): Promise<LikeCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * - Busca um like específico entre usuário e comentário
   * - Utilizado para verificar se já existe like antes do toggle
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeCompletions | null>} Like encontrado ou null
   */
  async findByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<LikeCompletions | null> {
    return await this.dao.findByUsuarioAndComentario(usuarioId, comentarioId)
  }

  /**
   * Remove um like por ID
   * @param {string} id - ID único do like a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * - Remove um like específico entre usuário e comentário
   * - Utilizado na operação de unlike durante o toggle
   * @param {string} usuarioId - ID do usuário
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<void>}
   */
  async deleteByUsuarioAndComentario(
    usuarioId: string,
    comentarioId: string
  ): Promise<void> {
    return await this.dao.deleteByUsuarioAndComentario(usuarioId, comentarioId)
  }

  /**
   * Lista todos os likes de um comentário específico
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<LikeCompletions[]>} Lista de likes do comentário
   */
  async findByComentario(comentarioId: string): Promise<LikeCompletions[]> {
    return await this.dao.findByComentario(comentarioId)
  }

  /**
   * Lista todos os likes dados por um usuário específico
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<LikeCompletions[]>} Lista de likes do usuário
   */
  async findByUsuario(usuarioId: string): Promise<LikeCompletions[]> {
    return await this.dao.findByUsuario(usuarioId)
  }

  /**
   * - Conta o número total de likes de um comentário
   * - Utilizado para retornar estatísticas após toggle de like
   * @param {string} comentarioId - ID do comentário
   * @returns {Promise<number>} Número total de likes no comentário
   */
  async countByComentario(comentarioId: string): Promise<number> {
    return await this.dao.countByComentario(comentarioId)
  }

  /**
   * - Verifica se um usuário é o proprietário de um like
   * - Utilizado para validações de autorização
   * @param {string} likeId - ID do like
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} true se o usuário é o proprietário, false caso contrário
   */
  async isLikeOwner(likeId: string, userId: string): Promise<boolean> {
    return await this.dao.isLikeOwner(likeId, userId)
  }
}
