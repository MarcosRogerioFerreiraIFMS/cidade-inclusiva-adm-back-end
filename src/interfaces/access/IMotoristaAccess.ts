import type { MotoristaCreateDTO } from '@/dtos/create'
import type { MotoristaUpdateDTO } from '@/dtos/update'
import type { MotoristaCompletions } from '@/types'

/**
 * Interface de acesso a dados de motoristas
 * Define os contratos para operações de persistência e consulta no repositório/DAO
 */
export interface IMotoristaAccess {
  /**
   * Cria um novo motorista
   * @param data - Dados do motorista a ser criado
   * @returns Promise com o motorista criado incluindo relacionamentos
   */
  create(data: MotoristaCreateDTO): Promise<MotoristaCompletions>

  /**
   * Busca um motorista por ID
   * @param id - ID único do motorista
   * @returns Promise com o motorista encontrado ou null se não existir
   */
  findById(id: string): Promise<MotoristaCompletions | null>

  /**
   * Busca um motorista por telefone
   * @param telefone - Telefone do motorista
   * @returns Promise com o motorista encontrado ou null se não existir
   */
  findByTelefone(telefone: string): Promise<MotoristaCompletions | null>

  /**
   * Busca um motorista por telefone incluindo deletados
   * @param telefone - Telefone do motorista
   * @returns Promise com o motorista encontrado ou null se não existir
   */
  findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<MotoristaCompletions | null>

  /**
   * Busca um motorista por email
   * @param email - Email do motorista
   * @returns Promise com o motorista encontrado ou null se não existir
   */
  findByEmail(email: string): Promise<MotoristaCompletions | null>

  /**
   * Busca um motorista por email incluindo deletados
   * @param email - Email do motorista
   * @returns Promise com o motorista encontrado ou null se não existir
   */
  findByEmailIncludingDeleted(
    email: string
  ): Promise<MotoristaCompletions | null>

  /**
   * Lista todos os motoristas
   * @returns Promise com array de todos os motoristas
   */
  findAll(): Promise<MotoristaCompletions[]>

  /**
   * Atualiza os dados de um motorista
   * @param id - ID único do motorista
   * @param data - Dados a serem atualizados
   * @returns Promise com o motorista atualizado
   */
  update(id: string, data: MotoristaUpdateDTO): Promise<MotoristaCompletions>

  /**
   * Restaura e atualiza um motorista soft-deleted
   * @param id - ID do motorista a ser restaurado e atualizado
   * @param motoristaData - Dados do motorista para atualização
   * @returns Promise com o motorista restaurado e atualizado
   */
  restoreAndUpdate(
    id: string,
    motoristaData: MotoristaCreateDTO
  ): Promise<MotoristaCompletions>

  /**
   * Remove um motorista do sistema
   * @param id - ID único do motorista a ser removido
   * @returns Promise vazia
   */
  delete(id: string): Promise<void>

  /**
   * Restaura um motorista soft-deleted
   * @param id - ID único do motorista a ser restaurado
   * @returns Promise com o motorista restaurado
   */
  restore(id: string): Promise<MotoristaCompletions>
}
