import { ComentarioCreateRelationalDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'
import { ComentarioCompletions } from '../../types/ComentarioTypes'

/**
 * Interface de acesso a dados de comentários
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IComentarioAccess {
  /**
   * Cria um novo comentário no banco de dados
   * @param {ComentarioCreateRelationalDTO} data - Dados do comentário
   * @returns {Promise<ComentarioCompletions>} Comentário criado
   */
  create(data: ComentarioCreateRelationalDTO): Promise<ComentarioCompletions>

  /**
   * Busca comentário por ID
   * @param {string} id - ID do comentário
   * @returns {Promise<ComentarioCompletions | null>} Comentário ou null se não encontrado
   */
  findById(id: string): Promise<ComentarioCompletions | null>

  /**
   * Atualiza dados de um comentário
   * @param {string} id - ID do comentário
   * @param {ComentarioUpdateDTO} data - Dados para atualização
   * @returns {Promise<ComentarioCompletions>} Comentário atualizado
   */
  update(id: string, data: ComentarioUpdateDTO): Promise<ComentarioCompletions>

  /**
   * Remove um comentário do banco de dados
   * @param {string} id - ID do comentário a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todos os comentários
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários
   */
  findAll(): Promise<ComentarioCompletions[]>

  /**
   * Lista todos os comentários visíveis
   * @returns {Promise<ComentarioCompletions[]>} Lista de comentários visíveis
   */
  findVisible(): Promise<ComentarioCompletions[]>

  /**
   * Busca comentários de um profissional específico
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioCompletions[]>} Comentários do profissional
   */
  findByProfissional(profissionalId: string): Promise<ComentarioCompletions[]>

  /**
   * Busca comentários visíveis de um profissional
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioCompletions[]>} Comentários visíveis do profissional
   */
  findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]>

  /**
   * Busca comentários de um usuário específico
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<ComentarioCompletions[]>} Comentários do usuário
   */
  findByUsuario(usuarioId: string): Promise<ComentarioCompletions[]>

  /**
   * Verifica se um usuário é dono de um comentário específico
   * @param {string} commentId - ID do comentário
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} True se o usuário é dono do comentário
   */
  isCommentOwner(commentId: string, userId: string): Promise<boolean>
}
