import { MobilidadeCreateDTO } from '../../dtos/create/MobilidadeCreateDTO'
import { MobilidadeUpdateDTO } from '../../dtos/update/MobilidadeUpdateDTO'
import { MobilidadeCompletions } from '../../types/MobilidadeTypes'

/**
 * Interface que define o contrato para acesso aos dados de mobilidade
 * Estabelece as operações CRUD básicas que devem ser implementadas
 * pelos repositórios e DAOs de mobilidade
 */
export interface IMobilidadeAccess {
  /**
   * Cria uma nova mobilidade no sistema
   * @param {MobilidadeCreateDTO} data - Dados da mobilidade a ser criada
   * @returns {Promise<MobilidadeCompletions>} Mobilidade criada com todas as relações
   */
  create(data: MobilidadeCreateDTO): Promise<MobilidadeCompletions>

  /**
   * Busca uma mobilidade pelo seu ID único
   * @param {string} id - ID único da mobilidade
   * @returns {Promise<MobilidadeCompletions | null>} Mobilidade encontrada ou null se não existir
   */
  findById(id: string): Promise<MobilidadeCompletions | null>

  /**
   * Atualiza os dados de uma mobilidade existente
   * @param {string} id - ID único da mobilidade a ser atualizada
   * @param {MobilidadeUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<MobilidadeCompletions>} Mobilidade atualizada com todas as relações
   */
  update(id: string, data: MobilidadeUpdateDTO): Promise<MobilidadeCompletions>

  /**
   * Remove uma mobilidade do sistema
   * @param {string} id - ID único da mobilidade a ser removida
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todas as mobilidades do sistema
   * @returns {Promise<MobilidadeCompletions[]>} Lista de todas as mobilidades
   */
  findAll(): Promise<MobilidadeCompletions[]>

  /**
   * Busca mobilidades por usuário
   * @param {string} usuarioId - ID único do usuário
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades do usuário
   */
  findByUsuario(usuarioId: string): Promise<MobilidadeCompletions[]>

  /**
   * Busca mobilidades por status
   * @param {string} status - Status das mobilidades
   * @returns {Promise<MobilidadeCompletions[]>} Lista de mobilidades com o status especificado
   */
  findByStatus(status: string): Promise<MobilidadeCompletions[]>

  /**
   * Verifica se o usuário é proprietário da mobilidade
   * @param {string} mobilidadeId - ID único da mobilidade
   * @param {string} userId - ID único do usuário
   * @returns {Promise<boolean>} True se o usuário for proprietário, false caso contrário
   */
  isMobilidadeOwner(mobilidadeId: string, userId: string): Promise<boolean>
}
