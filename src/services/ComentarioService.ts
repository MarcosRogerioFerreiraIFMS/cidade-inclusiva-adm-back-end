import { HttpStatusCode, TipoEntidadeComentario, TipoUsuario } from '@/enums'
import type {
  IAcessibilidadeUrbanaAccess,
  IComentarioAccess,
  IManutencaoAccess,
  IMotoristaAccess,
  IProfissionalAccess
} from '@/interfaces/access'

import type {
  ComentarioCreateDTO,
  ComentarioCreateRelationalDTO
} from '@/dtos/create'
import type { ComentarioResponseDTO } from '@/dtos/response'
import type { IComentarioService } from '@/interfaces/services'
import { toCreateComentarioDTO, toUpdateComentarioDTO } from '@/mappers/input'
import { toComentarioResponseDTO } from '@/mappers/output'
import type { ComentarioCompletions, UsuarioCompletions } from '@/types'
import { HttpError, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a comentários:
 * - Implementa a interface IComentarioService e gerencia operações CRUD de comentários
 * - Controla relacionamentos entre comentários, usuários e múltiplas entidades
 * - Gerencia regras de visibilidade dos comentários
 */
export class ComentarioService implements IComentarioService {
  /**
   * Construtor do serviço de comentários
   * @param {IComentarioAccess} comentarioRepository - Repositório para acesso aos dados de comentários
   * @param {IProfissionalAccess} profissionalRepository - Repositório para validação de profissionais
   * @param {IMotoristaAccess} motoristaRepository - Repositório para validação de motoristas
   * @param {IManutencaoAccess} manutencaoRepository - Repositório para validação de manutenções
   * @param {IAcessibilidadeUrbanaAccess} acessibilidadeUrbanaRepository - Repositório para validação de acessibilidade urbana
   */
  constructor(
    private comentarioRepository: IComentarioAccess,
    private profissionalRepository: IProfissionalAccess,
    private motoristaRepository: IMotoristaAccess,
    private manutencaoRepository: IManutencaoAccess,
    private acessibilidadeUrbanaRepository: IAcessibilidadeUrbanaAccess
  ) {}

  /**
   * Cria um novo comentário no sistema:
   * - Valida a existência da entidade relacionada
   * - Aplica sanitização XSS no conteúdo através do schema Zod
   * @param {unknown} data - Dados do comentário a ser criado
   * @param {UsuarioCompletions | undefined} user - Dados completos do usuário autenticado que está criando o comentário
   * @returns {Promise<ComentarioResponseDTO>} Dados do comentário criado
   * @throws {HttpError} Erro 401 se usuário não autenticado, 404 se entidade não encontrada
   */
  async create(
    data: unknown,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO> {
    if (!user) {
      throw new HttpError(
        'Usuário não autenticado.',
        HttpStatusCode.UNAUTHORIZED
      )
    }

    const comentarioData = toCreateComentarioDTO({
      ...(typeof data === 'object' && data !== null ? data : {}),
      usuarioId: user.id
    })

    await this.validateEntityExists(
      comentarioData.tipoEntidade,
      comentarioData.entidadeId
    )

    const comentarioDataRelational: ComentarioCreateRelationalDTO =
      this.buildRelationalData(comentarioData)

    const comentario = await this.comentarioRepository.create(
      comentarioDataRelational
    )

    return toComentarioResponseDTO(comentario)
  }

  /**
   * Busca um comentário específico pelo ID:
   * - Valida se o comentário existe
   * - Aplica regras de visibilidade (comentários invisíveis só para admins)
   * @param {string} id - ID único do comentário
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado
   * @returns {Promise<ComentarioResponseDTO>} Dados do comentário encontrado
   * @throws {HttpError} Erro 404 se o comentário não for encontrado ou não estiver visível
   */
  async findById(
    id: string,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO> {
    const comentario = throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    const isAdmin = user?.tipo === TipoUsuario.ADMIN
    if (!comentario.visivel && !isAdmin) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    return toComentarioResponseDTO(comentario)
  }

  /**
   * Atualiza um comentário existente:
   * - Valida se o comentário existe
   * - Valida permissões para alterar campo 'visivel' (apenas admin)
   * - Aplica sanitização XSS no conteúdo através do schema Zod
   * @param {string} id - ID único do comentário a ser atualizado
   * @param {unknown} data - Novos dados do comentário
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado
   * @returns {Promise<ComentarioResponseDTO>} Dados do comentário atualizado
   * @throws {HttpError} Erro 404 se não encontrado, 403 se não tiver permissão para alterar visibilidade
   */
  async update(
    id: string,
    data: unknown,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO> {
    throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    const comentarioData = toUpdateComentarioDTO(data)

    const isAdmin = user?.tipo === TipoUsuario.ADMIN
    if (
      comentarioData.visivel !== undefined &&
      comentarioData.visivel !== null &&
      !isAdmin
    ) {
      throw new HttpError(
        'Apenas administradores podem alterar a visibilidade de comentários.',
        HttpStatusCode.FORBIDDEN
      )
    }

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
   * Busca comentários de uma entidade específica:
   * - Valida se a entidade existe antes de buscar comentários
   * - Aplica filtro de visibilidade (usuários comuns só veem comentários visíveis)
   * - Admins podem ver todos os comentários
   * @param {TipoEntidadeComentario} tipoEntidade - Tipo da entidade
   * @param {string} entidadeId - ID da entidade
   * @param {UsuarioCompletions | undefined} user - Usuário autenticado
   * @returns {Promise<ComentarioResponseDTO[]>} Lista de comentários
   * @throws {HttpError} Erro 404 se a entidade não for encontrada
   */
  async findByEntidade(
    tipoEntidade: TipoEntidadeComentario,
    entidadeId: string,
    user: UsuarioCompletions | undefined
  ): Promise<ComentarioResponseDTO[]> {
    // Valida se a entidade existe antes de buscar comentários
    await this.validateEntityExists(tipoEntidade, entidadeId)

    const isAdmin = user?.tipo === TipoUsuario.ADMIN
    const includeInvisible = isAdmin

    let comentarios: ComentarioCompletions[] = []

    switch (tipoEntidade) {
      case TipoEntidadeComentario.PROFISSIONAL:
        comentarios = await this.comentarioRepository.findByProfissionalId(
          entidadeId,
          includeInvisible
        )
        break

      case TipoEntidadeComentario.MOTORISTA:
        comentarios = await this.comentarioRepository.findByMotoristaId(
          entidadeId,
          includeInvisible
        )
        break

      case TipoEntidadeComentario.MANUTENCAO:
        comentarios = await this.comentarioRepository.findByManutencaoId(
          entidadeId,
          includeInvisible
        )
        break

      case TipoEntidadeComentario.ACESSIBILIDADE_URBANA:
        comentarios =
          await this.comentarioRepository.findByAcessibilidadeUrbanaId(
            entidadeId,
            includeInvisible
          )
        break
    }

    return comentarios.map(toComentarioResponseDTO)
  }

  /**
   * Valida se a entidade existe no sistema
   * @param {TipoEntidadeComentario} tipoEntidade - Tipo da entidade
   * @param {string} entidadeId - ID da entidade
   * @throws {HttpError} Erro 404 se a entidade não for encontrada
   */
  private async validateEntityExists(
    tipoEntidade: TipoEntidadeComentario,
    entidadeId: string
  ): Promise<void> {
    let entityExists = false
    let entityName = ''

    switch (tipoEntidade) {
      case TipoEntidadeComentario.PROFISSIONAL: {
        const profissional = await this.profissionalRepository.findById(
          entidadeId
        )
        entityExists = !!profissional
        entityName = 'Profissional'
        break
      }

      case TipoEntidadeComentario.MOTORISTA: {
        const motorista = await this.motoristaRepository.findById(entidadeId)
        entityExists = !!motorista
        entityName = 'Motorista'
        break
      }

      case TipoEntidadeComentario.MANUTENCAO: {
        const manutencao = await this.manutencaoRepository.findById(entidadeId)
        entityExists = !!manutencao
        entityName = 'Manutenção'
        break
      }

      case TipoEntidadeComentario.ACESSIBILIDADE_URBANA: {
        const acessibilidade =
          await this.acessibilidadeUrbanaRepository.findById(entidadeId)
        entityExists = !!acessibilidade
        entityName = 'Acessibilidade Urbana'
        break
      }
    }

    if (!entityExists) {
      throw new HttpError(
        `${entityName} não encontrado(a).`,
        HttpStatusCode.NOT_FOUND
      )
    }
  }

  /**
   * Constrói dados relacionais baseado no tipo de entidade
   * @param {ComentarioCreateDTO} comentarioData - Dados do comentário validados
   * @returns {ComentarioCreateRelationalDTO} Dados com relacionamentos configurados
   */
  private buildRelationalData(
    comentarioData: ComentarioCreateDTO
  ): ComentarioCreateRelationalDTO {
    const relationalData: ComentarioCreateRelationalDTO = {
      ...comentarioData
    }

    switch (comentarioData.tipoEntidade) {
      case TipoEntidadeComentario.PROFISSIONAL:
        relationalData.profissionalId = comentarioData.entidadeId
        break

      case TipoEntidadeComentario.MOTORISTA:
        relationalData.motoristaId = comentarioData.entidadeId
        break

      case TipoEntidadeComentario.MANUTENCAO:
        relationalData.manutencaoId = comentarioData.entidadeId
        break

      case TipoEntidadeComentario.ACESSIBILIDADE_URBANA:
        relationalData.acessibilidadeUrbanaId = comentarioData.entidadeId
        break
    }

    return relationalData
  }
}
