import type { NoticiaCreateDTO } from '@/dtos/create'
import type { NoticiaUpdateDTO } from '@/dtos/update'
import type { NoticiaCompletions } from '@/types'

/**
 * Interface de acesso a dados de notícias
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface INoticiaAccess {
  /**
   * Cria uma nova notícia no banco de dados
   * @param {NoticiaCreateDTO} data - Dados da notícia
   * @returns {Promise<NoticiaCompletions>} Notícia criada
   */
  create(data: NoticiaCreateDTO): Promise<NoticiaCompletions>

  /**
   * Busca notícia por ID
   * @param {string} id - ID da notícia
   * @returns {Promise<NoticiaCompletions | null>} Notícia ou null se não encontrada
   */
  findById(id: string): Promise<NoticiaCompletions | null>

  /**
   * Atualiza dados de uma notícia
   * @param {string} id - ID da notícia
   * @param {NoticiaUpdateDTO} data - Dados para atualização
   * @returns {Promise<NoticiaCompletions>} Notícia atualizada
   */
  update(id: string, data: NoticiaUpdateDTO): Promise<NoticiaCompletions>

  /**
   * Remove uma notícia do banco de dados
   * @param {string} id - ID da notícia a ser removida
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Restaura uma notícia soft-deleted
   * @param {string} id - ID da notícia a ser restaurada
   * @returns {Promise<NoticiaCompletions>} Notícia restaurada
   */
  restore(id: string): Promise<NoticiaCompletions>

  /**
   * Lista todas as notícias
   * @returns {Promise<NoticiaCompletions[]>} Lista de notícias
   */
  findAll(): Promise<NoticiaCompletions[]>
}
