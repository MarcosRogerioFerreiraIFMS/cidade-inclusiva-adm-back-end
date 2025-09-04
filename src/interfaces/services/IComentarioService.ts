import { ComentarioResponseDTO } from '../../dtos/response/ComentarioResponseDTO'
import { JWTPayload } from '../../utils/jwtUtils'

/**
 * Interface para serviço de comentários
 * Define os contratos para operações de negócio relacionadas aos comentários
 */
export interface IComentarioService {
  /**
   * Cria um novo comentário
   * @param {unknown} data - Dados do comentário a ser criado
   * @param {JWTPayload | undefined} user - Usuário autenticado que está criando o comentário
   * - O usuário autenticado é obrigatório para criar um comentário
   * @returns {Promise<ComentarioResponseDTO>} Comentário criado
   */
  create(
    data: unknown,
    user: JWTPayload | undefined
  ): Promise<ComentarioResponseDTO>

  /**
   * Busca comentário por ID
   * @param {string} id - ID do comentário
   * @returns {Promise<ComentarioResponseDTO>} Comentário encontrado
   */
  findById(id: string): Promise<ComentarioResponseDTO>

  /**
   * Atualiza um comentário existente
   * @param {string} id - ID do comentário
   * @param {unknown} data - Dados para atualização
   * @returns {Promise<ComentarioResponseDTO>} Comentário atualizado
   */
  update(id: string, data: unknown): Promise<ComentarioResponseDTO>

  /**
   * Remove um comentário
   * @param {string} id - ID do comentário a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Lista todos os comentários
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários
   */
  findAll(): Promise<ComentarioResponseDTO[]>

  /**
   * Busca comentários de um profissional específico
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioResponseDTO[]>} Comentários do profissional
   */
  findByProfissional(profissionalId: string): Promise<ComentarioResponseDTO[]>

  /**
   * Busca comentários visíveis de um profissional
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioResponseDTO[]>} Comentários visíveis do profissional
   */
  findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioResponseDTO[]>

  /**
   * Busca comentários de um usuário específico
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<ComentarioResponseDTO[]>} Comentários do usuário
   */
  findByUsuario(usuarioId: string): Promise<ComentarioResponseDTO[]>
}
