import { ProfissionalResponseDTO } from '@/dtos/response'
import { IProfissionalAccess } from '@/interfaces/access'
import { IProfissionalService } from '@/interfaces/services'
import {
  toCreateProfissionalDTO,
  toUpdateProfissionalDTO
} from '@/mappers/input'
import {
  toProfissionaisResponseDTO,
  toProfissionalResponseDTO
} from '@/mappers/output'
import { throwIfAlreadyExists, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a profissionais:
 * - Implementa a interface IProfissionalService e gerencia operações CRUD de profissionais
 * - Aplica validações de unicidade (email, telefone) e regras de negócio específicas
 */
export class ProfissionalService implements IProfissionalService {
  /**
   * Construtor do serviço de profissionais
   * @param {IProfissionalAccess} profissionalRepository - Repositório para acesso aos dados de profissionais
   */
  constructor(private profissionalRepository: IProfissionalAccess) {}

  /**
   * Cria um novo profissional no sistema:
   * - Valida unicidade de email e telefone antes da criação
   * @param {unknown} data - Dados do profissional a ser criado
   * @returns {Promise<ProfissionalResponseDTO>} Dados do profissional criado
   * @throws {HttpError} Erro 409 se email ou telefone já existirem
   */
  async create(data: unknown): Promise<ProfissionalResponseDTO> {
    const profissionalData = await toCreateProfissionalDTO(data)

    const [profissionalWithEmail, profissionalWithTelefone] = await Promise.all(
      [
        this.profissionalRepository.findByEmail(profissionalData.email),
        this.profissionalRepository.findByTelefone(profissionalData.telefone)
      ]
    )

    throwIfAlreadyExists(
      profissionalWithEmail,
      'Já existe um profissional cadastrado com este email.'
    )

    throwIfAlreadyExists(
      profissionalWithTelefone,
      'Já existe um profissional cadastrado com este telefone.'
    )

    const profissional = await this.profissionalRepository.create(
      profissionalData
    )

    return toProfissionalResponseDTO(profissional)
  }

  /**
   * Busca um profissional específico pelo ID:
   * - Valida se o profissional existe antes de retornar
   * @param {string} id - ID único do profissional
   * @returns {Promise<ProfissionalResponseDTO>} Dados do profissional encontrado
   * @throws {HttpError} Erro 404 se o profissional não for encontrado
   */
  async findById(id: string): Promise<ProfissionalResponseDTO> {
    const profissional = throwIfNotFound(
      await this.profissionalRepository.findById(id),
      'Profissional não encontrado.'
    )

    return toProfissionalResponseDTO(profissional)
  }

  /**
   * Atualiza um profissional existente:
   * - Valida se o profissional existe e verifica unicidade de email/telefone se alterados
   * @param {string} id - ID único do profissional a ser atualizado
   * @param {unknown} data - Novos dados do profissional
   * @returns {Promise<ProfissionalResponseDTO>} Dados do profissional atualizado
   * @throws {HttpError} Erro 404 se o profissional não for encontrado ou 409 se email/telefone já existirem
   */
  async update(id: string, data: unknown): Promise<ProfissionalResponseDTO> {
    const existingProfissional = throwIfNotFound(
      await this.profissionalRepository.findById(id),
      'Profissional não encontrado.'
    )

    const updateData = await toUpdateProfissionalDTO(data)

    // Validar email se está sendo alterado
    if (updateData.email && updateData.email !== existingProfissional.email) {
      const profissionalWithEmail =
        await this.profissionalRepository.findByEmail(updateData.email)

      if (profissionalWithEmail && profissionalWithEmail.id !== id) {
        throwIfAlreadyExists(
          profissionalWithEmail,
          'Já existe um profissional cadastrado com este email.'
        )
      }
    }

    // Validar telefone se está sendo alterado
    if (
      updateData.telefone &&
      updateData.telefone !== existingProfissional.telefone
    ) {
      throwIfAlreadyExists(
        await this.profissionalRepository.findByTelefone(updateData.telefone),
        'Já existe um profissional cadastrado com este telefone.'
      )
    }

    const profissional = await this.profissionalRepository.update(
      id,
      updateData
    )

    return toProfissionalResponseDTO(profissional)
  }

  /**
   * Remove um profissional do sistema:
   * - Valida se o profissional existe antes de remover
   * @param {string} id - ID único do profissional a ser removido
   * @returns {Promise<void>}
   * @throws {HttpError} Erro 404 se o profissional não for encontrado
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.profissionalRepository.findById(id),
      'Profissional não encontrado.'
    )

    await this.profissionalRepository.delete(id)
  }

  /**
   * Recupera todos os profissionais do sistema:
   * - Retorna lista vazia se não houver profissionais
   * @returns {Promise<ProfissionalResponseDTO[]>} Lista de todos os profissionais
   */
  async findAll(): Promise<ProfissionalResponseDTO[]> {
    const profissionais = await this.profissionalRepository.findAll()

    if (!profissionais || profissionais.length === 0) {
      return []
    }

    return toProfissionaisResponseDTO(profissionais)
  }
}
