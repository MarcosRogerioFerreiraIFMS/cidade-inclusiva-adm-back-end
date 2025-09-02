import { NoticiaResponseDTO } from '../../dtos/response/NoticiaResponseDTO'

/**
 * Interface para serviço de notícias
 * Define os contratos para operações de negócio relacionadas às notícias
 */
export interface INoticiaService {
  /**
   * Cria uma nova notícia
   * @param {unknown} data - Dados da notícia a ser criada
   * @returns {Promise<NoticiaResponseDTO>} Notícia criada
   */
  create(data: unknown): Promise<NoticiaResponseDTO>

  /**
   * Busca notícia por ID
   * @param {string} id - ID da notícia
   * @returns {Promise<NoticiaResponseDTO>} Notícia encontrada
   */
  findById(id: string): Promise<NoticiaResponseDTO>

  /**
   * Atualiza uma notícia existente
   * @param {string} id - ID da notícia
   * @param {unknown} data - Dados para atualização
   * @returns {Promise<NoticiaResponseDTO>} Notícia atualizada
   */
  update(id: string, data: unknown): Promise<NoticiaResponseDTO>

  /**
   * Remove uma notícia
   * @param {string} id - ID da notícia a ser removida
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todas as notícias
   * @returns {Promise<NoticiaResponseDTO[]>} Lista de notícias
   */
  findAll(): Promise<NoticiaResponseDTO[]>
}
