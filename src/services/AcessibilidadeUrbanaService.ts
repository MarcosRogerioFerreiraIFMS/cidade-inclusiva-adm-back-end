import type { AcessibilidadeUrbanaResponseDTO } from '@/dtos/response'
import type { IAcessibilidadeUrbanaAccess } from '@/interfaces/access'
import type { IAcessibilidadeUrbanaService } from '@/interfaces/services'
import {
  toCreateAcessibilidadeUrbanaDTO,
  toCreateCategoriaAcessibilidadeUrbanaDTO,
  toCreateEmailDTO,
  toUpdateAcessibilidadeUrbanaDTO
} from '@/mappers/input'
import {
  toAcessibilidadeUrbanaResponseDTO,
  toAcessibilidadesUrbanasResponseDTO
} from '@/mappers/output'
import { throwIfAlreadyExists, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a acessibilidade urbana:
 * - Implementa a interface IAcessibilidadeUrbanaService e gerencia operações CRUD de acessibilidade urbana
 * - Aplica validações, transformações de dados e regras de negócio específicas
 */
export class AcessibilidadeUrbanaService
  implements IAcessibilidadeUrbanaService
{
  /**
   * Construtor do serviço de acessibilidade urbana
   * @param {IAcessibilidadeUrbanaAccess} acessibilidadeUrbanaRepository - Repositório para acesso aos dados de acessibilidade urbana
   */
  constructor(
    private acessibilidadeUrbanaRepository: IAcessibilidadeUrbanaAccess
  ) {}

  /**
   * Cria uma nova acessibilidade urbana no sistema:
   * - Valida os dados de entrada e transforma em DTO apropriado
   * - Se existir uma acessibilidade urbana soft-deleted com mesmo email ou telefone, reativa e atualiza
   * @param {unknown} data - Dados da acessibilidade urbana a ser criada
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO>} Dados da acessibilidade urbana criada
   */
  async create(data: unknown): Promise<AcessibilidadeUrbanaResponseDTO> {
    const acessibilidadeUrbanaData = await toCreateAcessibilidadeUrbanaDTO(data)

    // Verificar em paralelo acessibilidades urbanas ativas e deletadas com mesmo email ou telefone
    const [
      acessibilidadeUrbanaWithEmail,
      acessibilidadeUrbanaWithTelefone,
      deletedByEmail,
      deletedByTelefone
    ] = await Promise.all([
      this.acessibilidadeUrbanaRepository.findByEmail(
        acessibilidadeUrbanaData.email
      ),
      this.acessibilidadeUrbanaRepository.findByTelefone(
        acessibilidadeUrbanaData.telefone
      ),
      this.acessibilidadeUrbanaRepository.findByEmailIncludingDeleted(
        acessibilidadeUrbanaData.email
      ),
      this.acessibilidadeUrbanaRepository.findByTelefoneIncludingDeleted(
        acessibilidadeUrbanaData.telefone
      )
    ])

    // Se existe ativa, lançar erro
    throwIfAlreadyExists(
      acessibilidadeUrbanaWithEmail,
      'Já existe uma acessibilidade urbana cadastrada com este e-mail.'
    )

    throwIfAlreadyExists(
      acessibilidadeUrbanaWithTelefone,
      'Já existe uma acessibilidade urbana cadastrada com este telefone.'
    )

    // Se existe deletada, reativar e atualizar
    const deletedAcessibilidade = deletedByEmail || deletedByTelefone
    if (deletedAcessibilidade) {
      return toAcessibilidadeUrbanaResponseDTO(
        await this.acessibilidadeUrbanaRepository.restoreAndUpdate(
          deletedAcessibilidade.id,
          acessibilidadeUrbanaData
        )
      )
    }

    // Caso contrário, criar nova
    const acessibilidadeUrbana =
      await this.acessibilidadeUrbanaRepository.create(acessibilidadeUrbanaData)
    return toAcessibilidadeUrbanaResponseDTO(acessibilidadeUrbana)
  }

  /**
   * Busca uma acessibilidade urbana específica pelo ID:
   * - Valida se a acessibilidade urbana existe antes de retornar
   * @param {string} id - ID único da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO>} Dados da acessibilidade urbana encontrada
   * @throws {HttpError} Erro 404 se a acessibilidade urbana não for encontrada
   */
  async findById(id: string): Promise<AcessibilidadeUrbanaResponseDTO> {
    const acessibilidadeUrbana = throwIfNotFound(
      await this.acessibilidadeUrbanaRepository.findById(id),
      'Acessibilidade urbana não encontrada.'
    )

    return toAcessibilidadeUrbanaResponseDTO(acessibilidadeUrbana)
  }

  /**
   * Atualiza uma acessibilidade urbana existente:
   * - Valida se a acessibilidade urbana existe antes de atualizar
   * @param {string} id - ID único da acessibilidade urbana a ser atualizada
   * @param {unknown} data - Novos dados da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO>} Dados da acessibilidade urbana atualizada
   * @throws {HttpError} Erro 404 se a acessibilidade urbana não for encontrada
   */
  async update(
    id: string,
    data: unknown
  ): Promise<AcessibilidadeUrbanaResponseDTO> {
    const existingAcessibilidadeUrbana = throwIfNotFound(
      await this.acessibilidadeUrbanaRepository.findById(id),
      'Acessibilidade urbana não encontrada.'
    )

    const updateData = await toUpdateAcessibilidadeUrbanaDTO(data)

    // Se o email estiver sendo atualizado, verificar se não conflita com outro registro
    if (
      updateData.email &&
      updateData.email !== existingAcessibilidadeUrbana.email
    ) {
      const acessibilidadeUrbanaWithEmail =
        await this.acessibilidadeUrbanaRepository.findByEmailIncludingDeleted(
          updateData.email
        )
      if (
        acessibilidadeUrbanaWithEmail &&
        acessibilidadeUrbanaWithEmail.id !== id
      ) {
        throwIfAlreadyExists(
          acessibilidadeUrbanaWithEmail,
          'Já existe uma acessibilidade urbana cadastrada com este e-mail.'
        )
      }
    }

    // Se o telefone estiver sendo atualizado, verificar se não conflita com outro registro
    if (
      updateData.telefone &&
      updateData.telefone !== existingAcessibilidadeUrbana.telefone
    ) {
      const acessibilidadeUrbanaWithTelefone =
        await this.acessibilidadeUrbanaRepository.findByTelefoneIncludingDeleted(
          updateData.telefone
        )
      if (
        acessibilidadeUrbanaWithTelefone &&
        acessibilidadeUrbanaWithTelefone.id !== id
      ) {
        throwIfAlreadyExists(
          acessibilidadeUrbanaWithTelefone,
          'Já existe uma acessibilidade urbana cadastrada com este telefone.'
        )
      }
    }

    const acessibilidadeUrbana =
      await this.acessibilidadeUrbanaRepository.update(id, updateData)
    return toAcessibilidadeUrbanaResponseDTO(acessibilidadeUrbana)
  }

  /**
   * Remove uma acessibilidade urbana do sistema:
   * - Valida se a acessibilidade urbana existe antes de remover
   * @param {string} id - ID único da acessibilidade urbana a ser removida
   * @returns {Promise<void>}
   * @throws {HttpError} Erro 404 se a acessibilidade urbana não for encontrada
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.acessibilidadeUrbanaRepository.findById(id),
      'Acessibilidade urbana não encontrada.'
    )

    await this.acessibilidadeUrbanaRepository.delete(id)
  }

  /**
   * Recupera todas as acessibilidades urbanas do sistema:
   * - Retorna lista vazia se não houver acessibilidades urbanas
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO[]>} Lista de todas as acessibilidades urbanas
   */
  async findAll(): Promise<AcessibilidadeUrbanaResponseDTO[]> {
    const acessibilidadesUrbanas =
      await this.acessibilidadeUrbanaRepository.findAll()

    if (!acessibilidadesUrbanas || acessibilidadesUrbanas.length === 0) {
      return []
    }

    return toAcessibilidadesUrbanasResponseDTO(acessibilidadesUrbanas)
  }

  /**
   * Busca acessibilidade urbana por email
   * @param {string} email - Email da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO | null>} Acessibilidade urbana encontrada ou null
   */
  async findByEmail(
    email: string
  ): Promise<AcessibilidadeUrbanaResponseDTO | null> {
    const acessibilidade = throwIfNotFound(
      await this.acessibilidadeUrbanaRepository.findByEmail(
        toCreateEmailDTO(email)
      ),
      'Acessibilidade urbana não encontrada.'
    )

    return toAcessibilidadeUrbanaResponseDTO(acessibilidade)
  }

  /**
   * Busca acessibilidades urbanas por categoria
   * @param {string} categoria - Categoria da acessibilidade urbana
   * @returns {Promise<AcessibilidadeUrbanaResponseDTO[]>} Lista de acessibilidades urbanas
   */
  async findByCategoria(
    categoria: string
  ): Promise<AcessibilidadeUrbanaResponseDTO[]> {
    const acessibilidades =
      await this.acessibilidadeUrbanaRepository.findByCategoria(
        toCreateCategoriaAcessibilidadeUrbanaDTO(categoria)
      )
    return toAcessibilidadesUrbanasResponseDTO(acessibilidades)
  }
}
