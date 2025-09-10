import { ComentarioCreateRelationalDTO } from '@/dtos/create'
import { ComentarioUpdateDTO } from '@/dtos/update'
import { IComentarioAccess } from '@/interfaces/access'
import { ComentarioCompletions } from '@/types'

/**
 * Repository para operações de comentários:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * Responsável por coordenar operações CRUD de comentários com relacionamentos
 */
export class ComentarioRepository implements IComentarioAccess {
  /** DAO de comentários injetado para acesso aos dados */
  private dao: IComentarioAccess

  /**
   * Construtor do repository de comentários
   * @param {IComentarioAccess} dao - DAO de comentários para acesso aos dados
   */
  constructor(dao: IComentarioAccess) {
    this.dao = dao
  }

  /**
   * Cria um novo comentário com relacionamentos
   * @param {ComentarioCreateRelationalDTO} data - Dados do comentário com relacionamentos
   * @returns {Promise<ComentarioCompletions>} Comentário criado com todas as relações
   */
  async create(
    data: ComentarioCreateRelationalDTO
  ): Promise<ComentarioCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca um comentário por ID
   * @param {string} id - ID único do comentário
   * @returns {Promise<ComentarioCompletions | null>} Comentário encontrado ou null
   */
  async findById(id: string): Promise<ComentarioCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Atualiza os dados de um comentário
   * @param {string} id - ID único do comentário
   * @param {ComentarioUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<ComentarioCompletions>} Comentário atualizado
   */
  async update(
    id: string,
    data: ComentarioUpdateDTO
  ): Promise<ComentarioCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Remove um comentário do sistema
   * @param {string} id - ID único do comentário a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Lista todos os comentários do sistema
   * @returns {Promise<ComentarioCompletions[]>} Lista de todos os comentários
   */
  async findAll(): Promise<ComentarioCompletions[]> {
    return await this.dao.findAll()
  }

  async findVisible(): Promise<ComentarioCompletions[]> {
    return await this.dao.findVisible()
  }

  /**
   * Lista todos os comentários de um profissional específico
   * Inclui comentários visíveis e ocultos
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários do profissional
   */
  async findByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findByProfissional(profissionalId)
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
    return await this.dao.findVisibleByProfissional(profissionalId)
  }

  /**
   * Lista todos os comentários de um usuário específico
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários do usuário
   */
  async findByUsuario(usuarioId: string): Promise<ComentarioCompletions[]> {
    return await this.dao.findByUsuario(usuarioId)
  }

  /**
   * Verifica se um usuário é o proprietário de um comentário
   * Utilizado para validações de autorização
   * @param {string} commentId - ID do comentário
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} true se o usuário é o proprietário, false caso contrário
   */
  async isCommentOwner(commentId: string, userId: string): Promise<boolean> {
    return await this.dao.isCommentOwner(commentId, userId)
  }
}
