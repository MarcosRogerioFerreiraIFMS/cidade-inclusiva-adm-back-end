import type { ComentarioCreateRelationalDTO } from '@/dtos/create'
import type { ComentarioUpdateDTO } from '@/dtos/update'
import type { IComentarioAccess } from '@/interfaces/access'
import type { ComentarioCompletions } from '@/types'

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
   * Verifica se um usuário é o proprietário de um comentário
   * Utilizado para validações de autorização
   * @param {string} commentId - ID do comentário
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} true se o usuário é o proprietário, false caso contrário
   */
  async isCommentOwner(commentId: string, userId: string): Promise<boolean> {
    return await this.dao.isCommentOwner(commentId, userId)
  }

  /**
   * Busca todos os comentários de um profissional
   * @param {string} profissionalId - ID do profissional
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByProfissionalId(
    profissionalId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findByProfissionalId(profissionalId, includeInvisible)
  }

  /**
   * Busca todos os comentários de um motorista
   * @param {string} motoristaId - ID do motorista
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByMotoristaId(
    motoristaId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findByMotoristaId(motoristaId, includeInvisible)
  }

  /**
   * Busca todos os comentários de uma manutenção
   * @param {string} manutencaoId - ID da manutenção
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByManutencaoId(
    manutencaoId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findByManutencaoId(manutencaoId, includeInvisible)
  }

  /**
   * Busca todos os comentários de uma acessibilidade urbana
   * @param {string} acessibilidadeUrbanaId - ID da acessibilidade urbana
   * @param {boolean} includeInvisible - Se true, inclui comentários invisíveis (apenas admin)
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  async findByAcessibilidadeUrbanaId(
    acessibilidadeUrbanaId: string,
    includeInvisible?: boolean
  ): Promise<ComentarioCompletions[]> {
    return await this.dao.findByAcessibilidadeUrbanaId(
      acessibilidadeUrbanaId,
      includeInvisible
    )
  }
}
