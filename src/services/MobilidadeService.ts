import { MobilidadeResponseDTO } from '@/dtos/response'
import { HttpStatusCode } from '@/enums'
import { IMobilidadeAccess, IUsuarioAccess } from '@/interfaces/access'
import { IMobilidadeService } from '@/interfaces/services'
import {
  toCreateMobilidadeDTO,
  toUpdateMobilidadeDTO,
  toValidateMobilidadeStatus
} from '@/mappers/input'
import {
  toMobilidadeResponseDTO,
  toMobilidadesResponseDTO
} from '@/mappers/output'
import { HttpError, JWTPayload, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a mobilidades:
 * - Implementa a interface IMobilidadeService e gerencia operações CRUD de mobilidades
 * - Aplica validações, transformações de dados e regras de negócio específicas
 */
export class MobilidadeService implements IMobilidadeService {
  /**
   * Construtor do serviço de mobilidades
   * @param {IMobilidadeAccess} mobilidadeRepository - Repositório para acesso aos dados de mobilidades
   */
  constructor(
    private mobilidadeRepository: IMobilidadeAccess,
    private usuarioRepository: IUsuarioAccess
  ) {}

  /**
   * Cria uma nova mobilidade no sistema:
   * - Valida os dados de entrada e transforma em DTO apropriado
   * @param {unknown} data - Dados da mobilidade a ser criada
   * @param {JWTPayload | undefined} user - Usuário autenticado que está criando a mobilidade
   * - O usuário autenticado é obrigatório para criar uma mobilidade
   * @returns {Promise<MobilidadeResponseDTO>} Dados da mobilidade criada
   */
  async create(
    data: unknown,
    user: JWTPayload | undefined
  ): Promise<MobilidadeResponseDTO> {
    if (!user) {
      throw new HttpError(
        'Usuário não autenticado.',
        HttpStatusCode.UNAUTHORIZED
      )
    }

    return toMobilidadeResponseDTO(
      await this.mobilidadeRepository.create(
        toCreateMobilidadeDTO(data),
        user.userId
      )
    )
  }

  /**
   * Busca uma mobilidade específica pelo ID:
   * - Valida se a mobilidade existe antes de retornar
   * @param {string} id - ID único da mobilidade
   * @returns {Promise<MobilidadeResponseDTO>} Dados da mobilidade encontrada
   * @throws {HttpError} Erro 404 se a mobilidade não for encontrada
   */
  async findById(id: string): Promise<MobilidadeResponseDTO> {
    const mobilidade = throwIfNotFound(
      await this.mobilidadeRepository.findById(id),
      'Mobilidade não encontrada.'
    )

    return toMobilidadeResponseDTO(mobilidade)
  }

  /**
   * Atualiza uma mobilidade existente:
   * - Valida se a mobilidade existe antes de atualizar
   * @param {string} id - ID único da mobilidade a ser atualizada
   * @param {unknown} data - Novos dados da mobilidade
   * @returns {Promise<MobilidadeResponseDTO>} Dados da mobilidade atualizada
   * @throws {HttpError} Erro 404 se a mobilidade não for encontrada
   */
  async update(id: string, data: unknown): Promise<MobilidadeResponseDTO> {
    throwIfNotFound(
      await this.mobilidadeRepository.findById(id),
      'Mobilidade não encontrada.'
    )

    const mobilidade = await this.mobilidadeRepository.update(
      id,
      toUpdateMobilidadeDTO(data)
    )

    return toMobilidadeResponseDTO(mobilidade)
  }

  /**
   * Remove uma mobilidade do sistema:
   * - Valida se a mobilidade existe antes de remover
   * @param {string} id - ID único da mobilidade a ser removida
   * @returns {Promise<void>}
   * @throws {HttpError} Erro 404 se a mobilidade não for encontrada
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.mobilidadeRepository.findById(id),
      'Mobilidade não encontrada.'
    )

    await this.mobilidadeRepository.delete(id)
  }

  /**
   * Recupera todas as mobilidades do sistema:
   * - Retorna lista vazia se não houver mobilidades
   * @returns {Promise<MobilidadeResponseDTO[]>} Lista de todas as mobilidades
   */
  async findAll(): Promise<MobilidadeResponseDTO[]> {
    const mobilidades = await this.mobilidadeRepository.findAll()

    if (!mobilidades || mobilidades.length === 0) {
      return []
    }

    return toMobilidadesResponseDTO(mobilidades)
  }

  /**
   * Busca mobilidades por usuário:
   * - Retorna lista vazia se não houver mobilidades para o usuário
   * @param {string} usuarioId - ID único do usuário
   * @returns {Promise<MobilidadeResponseDTO[]>} Lista de mobilidades do usuário
   */
  async findByUsuario(usuarioId: string): Promise<MobilidadeResponseDTO[]> {
    const usuario = throwIfNotFound(
      await this.usuarioRepository.findById(usuarioId),
      'Usuário não encontrado.'
    )

    const mobilidades = await this.mobilidadeRepository.findByUsuario(
      usuario.id
    )

    if (!mobilidades || mobilidades.length === 0) {
      return []
    }

    return toMobilidadesResponseDTO(mobilidades)
  }

  /**
   * Busca mobilidades por status:
   * - Retorna lista vazia se não houver mobilidades com o status especificado
   * @param {string} status - Status das mobilidades
   * @returns {Promise<MobilidadeResponseDTO[]>} Lista de mobilidades com o status especificado
   */
  async findByStatus(status: string): Promise<MobilidadeResponseDTO[]> {
    const mobilidades = await this.mobilidadeRepository.findByStatus(
      toValidateMobilidadeStatus(status)
    )

    if (!mobilidades || mobilidades.length === 0) {
      return []
    }

    return toMobilidadesResponseDTO(mobilidades)
  }
}
