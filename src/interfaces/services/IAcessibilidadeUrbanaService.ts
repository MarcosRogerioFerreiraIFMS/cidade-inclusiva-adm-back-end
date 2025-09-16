import type { AcessibilidadeUrbanaResponseDTO } from '@/dtos/response'

/**
 * Interface para serviço de acessibilidade urbana
 * Define os métodos de negócio para operações CRUD
 */
export interface IAcessibilidadeUrbanaService {
  /**
   * Cria uma nova acessibilidade urbana
   * @param {unknown} data - Dados para criação
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO>} Acessibilidade urbana criada
   */
  create(data: unknown): Promise<AcessibilidadeUrbanaResponseDTO>

  /**
   * Busca uma acessibilidade urbana por ID
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO>} Acessibilidade urbana encontrada
   */
  findById(id: string): Promise<AcessibilidadeUrbanaResponseDTO>

  /**
   * Atualiza uma acessibilidade urbana existente
   * @param {string} id - ID único da acessibilidade urbana
   * @param {unknown} data - Dados para atualização
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO>} Acessibilidade urbana atualizada
   */
  update(id: string, data: unknown): Promise<AcessibilidadeUrbanaResponseDTO>

  /**
   * Remove uma acessibilidade urbana
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todas as acessibilidades urbanas
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO[]>} Lista de acessibilidades urbanas
   */
  findAll(): Promise<AcessibilidadeUrbanaResponseDTO[]>

  /**
   * Busca acessibilidade urbana por email
   * @param {string} email - Email da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO | null>} Acessibilidade urbana encontrada ou null
   */
  findByEmail(email: string): Promise<AcessibilidadeUrbanaResponseDTO | null>

  /**
   * Busca acessibilidades urbanas por categoria
   * @param {string} categoria - Categoria da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO[]>} Lista de acessibilidades urbanas
   */
  findByCategoria(categoria: string): Promise<AcessibilidadeUrbanaResponseDTO[]>
}
