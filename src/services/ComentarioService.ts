import { HttpStatusCode } from '@/enums'
import type {
  IComentarioAccess,
  IProfissionalAccess,
  IUsuarioAccess
} from '@/interfaces/access'

import type { ComentarioCreateRelationalDTO } from '@/dtos/create'
import type { ComentarioResponseDTO } from '@/dtos/response'
import type { IComentarioService } from '@/interfaces/services'
import { toCreateComentarioDTO, toUpdateComentarioDTO } from '@/mappers/input'
import {
  toComentarioResponseDTO,
  toComentariosResponseDTO
} from '@/mappers/output'
import type { JWTPayload } from '@/utils'
import { HttpError, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a comentários:
 * - Implementa a interface IComentarioService e gerencia operações CRUD de comentários
 * - Controla relacionamentos entre comentários, usuários e profissionais
 */
export class ComentarioService implements IComentarioService {
  /**
   * Construtor do serviço de comentários
   * @param {IComentarioAccess} comentarioRepository - Repositório para acesso aos dados de comentários
   * @param {IUsuarioAccess} usuarioRepository - Repositório para validação de usuários
   * @param {IProfissionalAccess} profissionalRepository - Repositório para validação de profissionais
   */
  constructor(
    private comentarioRepository: IComentarioAccess,
    private usuarioRepository: IUsuarioAccess,
    private profissionalRepository: IProfissionalAccess
  ) {}

  /**
   * Cria um novo comentário no sistema:
   * - Valida a existência do usuário e da entidade (profissional) relacionada
   * @param {unknown} data - Dados do comentário a ser criado
   * @param {JWTPayload | undefined} user - Usuário autenticado que está criando o comentário
   * - O usuário autenticado é obrigatório para criar um comentário
   * @returns {Promise<ComentarioResponseDTO>} Dados do comentário criado
   * @throws {HttpError} Erro 404 se usuário ou entidade não forem encontrados
   */
  async create(
    data: unknown,
    user: JWTPayload | undefined
  ): Promise<ComentarioResponseDTO> {
    if (!user) {
      throw new HttpError(
        'Usuário não autenticado.',
        HttpStatusCode.UNAUTHORIZED
      )
    }

    const comentarioData = toCreateComentarioDTO({
      ...(typeof data === 'object' && data !== null ? data : {}),
      usuarioId: user.userId
    })

    const [usuario, profissional] = await Promise.all([
      this.usuarioRepository.findById(comentarioData.usuarioId),
      this.profissionalRepository.findById(comentarioData.entidadeId)
    ])

    throwIfNotFound(usuario, 'Usuário não encontrado.')

    const comentarioDataRelational: ComentarioCreateRelationalDTO = {
      ...comentarioData,
      profissionalId: profissional?.id
    }

    throwIfNotFound(
      this.validEntityExists(comentarioDataRelational),
      'Nenhuma entidade encontrada para relacionar o comentário.'
    )

    const comentario = await this.comentarioRepository.create(
      comentarioDataRelational
    )

    return toComentarioResponseDTO(comentario)
  }

  /**
   * Busca um comentário específico pelo ID:
   * - Valida se o comentário existe antes de retornar
   * @param {string} id - ID único do comentário
   * @returns {Promise<ComentarioResponseDTO>} Dados do comentário encontrado
   * @throws {HttpError} Erro 404 se o comentário não for encontrado
   */
  async findById(id: string): Promise<ComentarioResponseDTO> {
    const comentario = throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    return toComentarioResponseDTO(comentario)
  }

  /**
   * Atualiza um comentário existente:
   * - Valida se o comentário existe antes de atualizar
   * @param {string} id - ID único do comentário a ser atualizado
   * @param {unknown} data - Novos dados do comentário
   * @returns {Promise<ComentarioResponseDTO>} Dados do comentário atualizado
   * @throws {HttpError} Erro 404 se o comentário não for encontrado
   */
  async update(id: string, data: unknown): Promise<ComentarioResponseDTO> {
    throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    const comentarioData = toUpdateComentarioDTO(data)

    const comentario = await this.comentarioRepository.update(
      id,
      comentarioData
    )
    return toComentarioResponseDTO(comentario)
  }

  /**
   * Remove um comentário do sistema:
   * - Valida se o comentário existe antes de remover
   * @param {string} id - ID único do comentário a ser removido
   * @returns {Promise<void>}
   * @throws {HttpError} Erro 404 se o comentário não for encontrado
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    await this.comentarioRepository.delete(id)
  }

  /**
   * Recupera todos os comentários do sistema
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de todos os comentários
   */
  async findAll(): Promise<ComentarioResponseDTO[]> {
    const comentarios = await this.comentarioRepository.findAll()
    return toComentariosResponseDTO(comentarios)
  }

  /**
   * Recupera todos os comentários visíveis
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários visíveis
   */
  async findVisible(): Promise<ComentarioResponseDTO[]> {
    const comentarios = await this.comentarioRepository.findVisible()
    return toComentariosResponseDTO(comentarios)
  }

  /**
   * Recupera todos os comentários de um profissional específico:
   * - Inclui comentários visíveis e ocultos (para uso administrativo)
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários do profissional
   * @throws {HttpError} Erro 404 se o profissional não for encontrado
   */
  async findByProfissional(
    profissionalId: string
  ): Promise<ComentarioResponseDTO[]> {
    throwIfNotFound(
      await this.profissionalRepository.findById(profissionalId),
      'Profissional não encontrado.'
    )

    const comentarios = await this.comentarioRepository.findByProfissional(
      profissionalId
    )
    return toComentariosResponseDTO(comentarios)
  }

  /**
   * Recupera apenas os comentários visíveis de um profissional específico:
   * - Filtra comentários que estão marcados como visíveis para exibição pública
   * @param {string} profissionalId - ID do profissional
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários visíveis do profissional
   */
  async findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioResponseDTO[]> {
    const comentarios =
      await this.comentarioRepository.findVisibleByProfissional(profissionalId)
    return toComentariosResponseDTO(comentarios)
  }

  /**
   * Recupera todos os comentários de um usuário específico:
   * - Lista todos os comentários feitos pelo usuário, ordenados por data de criação
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários do usuário
   * @throws {HttpError} Erro 404 se o usuário não for encontrado
   */
  async findByUsuario(usuarioId: string): Promise<ComentarioResponseDTO[]> {
    throwIfNotFound(
      await this.usuarioRepository.findById(usuarioId),
      'Usuário não encontrado.'
    )

    const comentarios = await this.comentarioRepository.findByUsuario(usuarioId)
    return toComentariosResponseDTO(comentarios)
  }

  /**
   * Valida se existe pelo menos uma entidade válida para relacionar o comentário:
   * - Método privado para verificar se o comentário pode ser relacionado a uma entidade
   * @param {ComentarioCreateRelationalDTO} comentarioDataRelational - Dados relacionais do comentário
   * @returns {boolean} true se existe uma entidade válida, false caso contrário
   */
  private validEntityExists(
    comentarioDataRelational: ComentarioCreateRelationalDTO
  ): boolean {
    const { profissionalId } = comentarioDataRelational

    return !!profissionalId
  }
}
