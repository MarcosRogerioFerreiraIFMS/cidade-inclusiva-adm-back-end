import type { NoticiaCreateDTO } from '@/dtos/create'
import type { NoticiaUpdateDTO } from '@/dtos/update'
import type { INoticiaAccess } from '@/interfaces/access'
import type { NoticiaCompletions } from '@/types'

/**
 * - Repository para operações de notícias:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * - Responsável por coordenar operações CRUD de notícias
 */
export class NoticiaRepository implements INoticiaAccess {
  /** DAO de notícias injetado para acesso aos dados */
  private dao: INoticiaAccess

  /**
   * Construtor do repository de notícias
   * @param {INoticiaAccess} dao - DAO de notícias para acesso aos dados
   */
  constructor(dao: INoticiaAccess) {
    this.dao = dao
  }

  /**
   * Cria uma nova notícia
   * @param {NoticiaCreateDTO} data - Dados da notícia a ser criada
   * @returns {Promise<NoticiaCompletions>} Notícia criada com todas as relações
   */
  async create(data: NoticiaCreateDTO): Promise<NoticiaCompletions> {
    return await this.dao.create(data)
  }

  /**
   * Busca uma notícia por ID
   * @param {string} id - ID único da notícia
   * @returns {Promise<NoticiaCompletions | null>} Notícia encontrada ou null
   */
  async findById(id: string): Promise<NoticiaCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Atualiza os dados de uma notícia
   * @param {string} id - ID único da notícia
   * @param {NoticiaUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<NoticiaCompletions>} Notícia atualizada
   */
  async update(
    id: string,
    data: NoticiaUpdateDTO
  ): Promise<NoticiaCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Remove uma notícia do sistema
   * @param {string} id - ID único da notícia a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Lista todas as notícias do sistema
   * @returns {Promise<NoticiaCompletions[]>} Lista de todas as notícias
   */
  async findAll(): Promise<NoticiaCompletions[]> {
    return await this.dao.findAll()
  }
}
