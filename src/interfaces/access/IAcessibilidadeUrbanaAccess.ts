import type { AcessibilidadeUrbanaCreateDTO } from '@/dtos/create'
import type { AcessibilidadeUrbanaUpdateDTO } from '@/dtos/update'
import type { AcessibilidadeUrbanaCompletions } from '@/types'

/**
 * Interface para acesso a dados de acessibilidade urbana
 * Define os métodos necessários para operações CRUD
 */
export interface IAcessibilidadeUrbanaAccess {
  /**
   * Cria uma nova acessibilidade urbana
   * @param {AcessibilidadeUrbanaCreateDTO} data - Dados para criação
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana criada
   */
  create(
    data: AcessibilidadeUrbanaCreateDTO
  ): Promise<AcessibilidadeUrbanaCompletions>

  /**
   * Busca uma acessibilidade urbana por ID
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  findById(id: string): Promise<AcessibilidadeUrbanaCompletions | null>

  /**
   * Atualiza uma acessibilidade urbana existente
   * @param {string} id - ID único da acessibilidade urbana
   * @param {AcessibilidadeUrbanaUpdateDTO} data - Dados para atualização
   * @returns {Promise<AcessibilidadeUrbanaCompletions>} Acessibilidade urbana atualizada
   */
  update(
    id: string,
    data: AcessibilidadeUrbanaUpdateDTO
  ): Promise<AcessibilidadeUrbanaCompletions>

  /**
   * Remove uma acessibilidade urbana
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todas as acessibilidades urbanas
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de acessibilidades urbanas
   */
  findAll(): Promise<AcessibilidadeUrbanaCompletions[]>

  /**
   * Busca acessibilidade urbana por email
   * @param {string} email - Email da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  findByEmail(email: string): Promise<AcessibilidadeUrbanaCompletions | null>

  /**
   * Busca acessibilidade urbana por telefone
   * @param {string} telefone - Telefone da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions | null>} Acessibilidade urbana encontrada ou null
   */
  findByTelefone(
    telefone: string
  ): Promise<AcessibilidadeUrbanaCompletions | null>

  /**
   * Busca acessibilidades urbanas por categoria
   * @param {string} categoria - Categoria da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaCompletions[]>} Lista de acessibilidades urbanas
   */
  findByCategoria(categoria: string): Promise<AcessibilidadeUrbanaCompletions[]>
}
