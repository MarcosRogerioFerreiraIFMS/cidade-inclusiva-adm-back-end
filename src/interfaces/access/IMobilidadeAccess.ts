import type { MobilidadeCreateDTO } from '@/dtos/create'
import type { MobilidadeUpdateDTO } from '@/dtos/update'
import type { MobilidadeCompletions } from '@/types'

/**
 * Interface que define o contrato para acesso aos dados de mobilidade
 * Estabelece as operações CRUD básicas que devem ser implementadas
 * pelos repositórios e DAOs de mobilidade
 */
export interface IMobilidadeAccess {
  /**
   * Cria uma nova mobilidade no sistema
   * @param {MobilidadeCreateDTO} data - Dados da mobilidade a ser criada
   * @param {string} userId - ID do usuário que está criando a mobilidade
   * @returns {Promise<MobilidadeCompletions>} Mobilidade criada com todas as relações
   */
  create(
    data: MobilidadeCreateDTO,
    userId: string
  ): Promise<MobilidadeCompletions>

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
   * Restaura uma mobilidade soft-deleted
   * @param {string} id - ID único da mobilidade a ser restaurada
   * @returns {Promise<MobilidadeCompletions>} Mobilidade restaurada
   */
  restore(id: string): Promise<MobilidadeCompletions>

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
   * Verifica se um usuário é o proprietário de uma mobilidade
   * Utilizado para validações de autorização
   * @param {string} mobilidadeId - ID da mobilidade
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean | null>} true se o usuário é o proprietário, false se não for, null se não existir
   */
  isMobilidadeOwner(
    mobilidadeId: string,
    userId: string
  ): Promise<boolean | null>
}
