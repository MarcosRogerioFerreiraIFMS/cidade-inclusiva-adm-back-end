import { MobilidadeCreateDTO } from '@/dtos/create'
import { MobilidadeUpdateDTO } from '@/dtos/update'
import { IMobilidadeAccess } from '@/interfaces/access'
import { MobilidadeCompletions } from '@/types'

/**
 * - Repository para operações de mobilidade:
 * - Implementa o padrão Repository fornecendo uma camada de abstração sobre o DAO
 * - Responsável por coordenar operações CRUD de mobilidades
 */
export class MobilidadeRepository implements IMobilidadeAccess {
  /** DAO de mobilidades injetado para acesso aos dados */
  private dao: IMobilidadeAccess

  /**
   * Construtor do repository de mobilidades
   * @param {IMobilidadeAccess} dao - DAO de mobilidades para acesso aos dados
   */
  constructor(dao: IMobilidadeAccess) {
    this.dao = dao
  }

  /**
   * Cria uma nova mobilidade
   * @param {MobilidadeCreateDTO} data - Dados da mobilidade a ser criada
   * @param {string} userId - ID do usuário que está criando a mobilidade
   * @returns {Promise<MobilidadeCompletions>} Mobilidade criada com todas as relações
   */
  async create(
    data: MobilidadeCreateDTO,
    userId: string
  ): Promise<MobilidadeCompletions> {
    return await this.dao.create(data, userId)
  }

  /**
   * Busca uma mobilidade por ID
   * @param {string} id - ID único da mobilidade
   * @returns {Promise<MobilidadeCompletions | null>} Mobilidade encontrada ou null
   */
  async findById(id: string): Promise<MobilidadeCompletions | null> {
    return await this.dao.findById(id)
  }

  /**
   * Atualiza os dados de uma mobilidade
   * @param {string} id - ID único da mobilidade
   * @param {MobilidadeUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<MobilidadeCompletions>} Mobilidade atualizada
   */
  async update(
    id: string,
    data: MobilidadeUpdateDTO
  ): Promise<MobilidadeCompletions> {
    return await this.dao.update(id, data)
  }

  /**
   * Remove uma mobilidade do sistema
   * @param {string} id - ID único da mobilidade a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.dao.delete(id)
  }

  /**
   * Lista todas as mobilidades do sistema
   * @returns {Promise<MobilidadeCompletions[]>} Lista de todas as mobilidades
   */
  async findAll(): Promise<MobilidadeCompletions[]> {
    return await this.dao.findAll()
  }

  /**
   * Busca mobilidades por usuário
   * @param {string} usuarioId - ID único do usuário
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades do usuário
   */
  async findByUsuario(usuarioId: string): Promise<MobilidadeCompletions[]> {
    return await this.dao.findByUsuario(usuarioId)
  }

  /**
   * Busca mobilidades por status
   * @param {string} status - Status das mobilidades
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades com o status especificado
   */
  async findByStatus(status: string): Promise<MobilidadeCompletions[]> {
    return await this.dao.findByStatus(status)
  }

  /**
   * Verifica se o usuário é proprietário da mobilidade
   * @param {string} mobilidadeId - ID único da mobilidade
   * @param {string} userId - ID único do usuário
   * @returns {Promise<boolean>} True se o usuário for proprietário, false caso contrário
   */
  async isMobilidadeOwner(
    mobilidadeId: string,
    userId: string
  ): Promise<boolean> {
    return await this.dao.isMobilidadeOwner(mobilidadeId, userId)
  }
}
