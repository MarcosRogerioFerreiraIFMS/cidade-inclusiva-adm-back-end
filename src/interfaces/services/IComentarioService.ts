import type { ComentarioResponseDTO } from '@/dtos/response'
import type { TipoEntidadeComentario } from '@/enums'
import type { UsuarioCompletions } from '@/types'

/**
 * Interface para serviço de comentários
 * Define os contratos para operações de negócio relacionadas aos comentários
 */
export interface IComentarioService {
  /**
   * Cria um novo comentário
   * @param {unknown} data - Dados do comentário a ser criado
   * @param {UsuarioCompletions | undefined} user - Dados completos do usuário autenticado que está criando o comentário
   * - O usuário autenticado é obrigatório para criar um comentário
   * @returns {Promise<ComentarioResponseDTO>} Comentário criado
   */
  create(
    data: unknown,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO>

  /**
   * Busca comentário por ID
   * @param {string} id - ID do comentário
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado (para verificar visibilidade)
   * @returns {Promise<ComentarioResponseDTO>} Comentário encontrado
   */
  findById(
    id: string,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO>

  /**
   * Atualiza um comentário existente
   * @param {string} id - ID do comentário
   * @param {unknown} data - Dados para atualização
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado (para verificar permissões)
   * @returns {Promise<ComentarioResponseDTO>} Comentário atualizado
   */
  update(
    id: string,
    data: unknown,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO>

  /**
   * Remove um comentário
   * @param {string} id - ID do comentário a ser removido
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>

  /**
   * Busca comentários de uma entidade específica
   * @param {TipoEntidadeComentario} tipoEntidade - Tipo da entidade
   * @param {string} entidadeId - ID da entidade
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado (para filtrar visibilidade)
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários
   */
  findByEntidade(
    tipoEntidade: TipoEntidadeComentario,
    entidadeId: string,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO[]>

  /**
   * Alterna a visibilidade de um comentário (apenas admin)
   * @param {string} id - ID do comentário
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado (deve ser admin)
   * @returns {Promise<ComentarioResponseDTO>} Comentário com visibilidade atualizada
   */
  toggleVisibility(
    id: string,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO>
}
