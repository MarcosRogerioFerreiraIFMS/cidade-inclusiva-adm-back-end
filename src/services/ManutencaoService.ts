import type { ManutencaoResponseDTO } from '@/dtos/response'
import type { IManutencaoAccess } from '@/interfaces/access'
import type { IManutencaoService } from '@/interfaces/services'
import {
  toCreateEmailDTO,
  toCreateManutencaoDTO,
  toUpdateManutencaoDTO
} from '@/mappers/input'
import {
  toManutencaoResponseDTO,
  toManutencoesResponseDTO
} from '@/mappers/output'
import { throwIfAlreadyExists, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio de manutenções:
 * - Implementa validações, regras de negócio e orquestra operações do repositório
 */
export class ManutencaoService implements IManutencaoService {
  /**
   * @param {IManutencaoAccess} manutencaoRepository - Repositório de manutenções para acesso aos dados
   */
  constructor(private manutencaoRepository: IManutencaoAccess) {}

  /**
   * Cria uma nova manutenção no sistema:
   * - Valida unicidade de email e telefone antes da criação
   * - Se existir uma manutenção soft-deleted com mesmo email ou telefone, reativa e atualiza
   * @param {unknown} data - Dados não tipados da manutenção vindos da requisição
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção criada formatada para resposta
   * @throws {HttpError} Quando email ou telefone já existem
   */
  async create(data: unknown): Promise<ManutencaoResponseDTO> {
    const manutencaoData = await toCreateManutencaoDTO(data)

    // Verificar em paralelo manutenções ativas e deletadas com mesmo email ou telefone
    const [
      manutencaoWithEmail,
      manutencaoWithTelefone,
      deletedByEmail,
      deletedByTelefone
    ] = await Promise.all([
      this.manutencaoRepository.findByEmail(manutencaoData.email),
      this.manutencaoRepository.findByTelefone(manutencaoData.telefone),
      this.manutencaoRepository.findByEmailIncludingDeleted(
        manutencaoData.email
      ),
      this.manutencaoRepository.findByTelefoneIncludingDeleted(
        manutencaoData.telefone
      )
    ])

    // Se existe ativa, lançar erro
    throwIfAlreadyExists(
      manutencaoWithEmail,
      'Já existe uma empresa de manutenção cadastrada com este email.'
    )

    throwIfAlreadyExists(
      manutencaoWithTelefone,
      'Já existe uma empresa de manutenção cadastrada com este telefone.'
    )

    // Se existe deletada, reativar e atualizar
    const deletedManutencao = deletedByEmail || deletedByTelefone
    if (deletedManutencao) {
      return toManutencaoResponseDTO(
        await this.manutencaoRepository.restoreAndUpdate(
          deletedManutencao.id,
          manutencaoData
        )
      )
    }

    // Caso contrário, criar nova
    const manutencao = await this.manutencaoRepository.create(manutencaoData)

    return toManutencaoResponseDTO(manutencao)
  }

  /**
   * Busca uma manutenção por ID
   * @param {string} id - ID único da manutenção
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção encontrada formatada para resposta
   * @throws {HttpError} Quando a manutenção não é encontrada
   */
  async findById(id: string): Promise<ManutencaoResponseDTO> {
    const manutencao = throwIfNotFound(
      await this.manutencaoRepository.findById(id),
      'Empresa de manutenção não encontrada.'
    )

    return toManutencaoResponseDTO(manutencao)
  }

  /**
   * Busca uma manutenção por email
   * @param {string} email - Email único da manutenção
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção encontrada formatada para resposta
   * @throws {HttpError} Quando a manutenção não é encontrada
   */
  async findByEmail(email: string): Promise<ManutencaoResponseDTO> {
    const manutencao = throwIfNotFound(
      await this.manutencaoRepository.findByEmail(toCreateEmailDTO(email)),
      'Empresa de manutenção não encontrada.'
    )

    return toManutencaoResponseDTO(manutencao)
  }

  /**
   * Atualiza os dados de uma manutenção existente:
   * - Valida se novos email/telefone não conflitam com outras manutenções
   * @param {string} id - ID único da manutenção
   * @param {unknown} data - Dados não tipados de atualização
   * @returns {Promise<ManutencaoResponseDTO>} Manutenção atualizada formatada para resposta
   * @throws {HttpError} Quando a manutenção não existe ou há conflito de dados
   */
  async update(id: string, data: unknown): Promise<ManutencaoResponseDTO> {
    const existingManutencao = throwIfNotFound(
      await this.manutencaoRepository.findById(id),
      'Empresa de manutenção não encontrada.'
    )

    const updateData = await toUpdateManutencaoDTO(data)

    if (updateData.email && updateData.email !== existingManutencao.email) {
      const manutencaoWithEmail =
        await this.manutencaoRepository.findByEmailIncludingDeleted(
          updateData.email
        )

      if (manutencaoWithEmail && manutencaoWithEmail.id !== id) {
        throwIfAlreadyExists(
          manutencaoWithEmail,
          'Já existe uma empresa de manutenção cadastrada com este email.'
        )
      }
    }

    if (
      updateData.telefone &&
      updateData.telefone !== existingManutencao.telefone
    ) {
      const manutencaoWithTelefone =
        await this.manutencaoRepository.findByTelefoneIncludingDeleted(
          updateData.telefone
        )

      if (manutencaoWithTelefone && manutencaoWithTelefone.id !== id) {
        throwIfAlreadyExists(
          manutencaoWithTelefone,
          'Já existe uma empresa de manutenção cadastrada com este telefone.'
        )
      }
    }

    const manutencao = await this.manutencaoRepository.update(id, updateData)

    return toManutencaoResponseDTO(manutencao)
  }

  /**
   * Remove uma manutenção do sistema
   * @param {string} id - ID único da manutenção a ser removida
   * @returns {Promise<void>}
   * @throws {HttpError} Quando a manutenção não é encontrada
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.manutencaoRepository.findById(id),
      'Empresa de manutenção não encontrada'
    )

    await this.manutencaoRepository.delete(id)
  }

  /**
   * Lista todas as manutenções do sistema
   * @returns {Promise<ManutencaoResponseDTO[]>} Lista de manutenções formatada para resposta
   */
  async findAll(): Promise<ManutencaoResponseDTO[]> {
    const manutencoes = await this.manutencaoRepository.findAll()

    if (!manutencoes || manutencoes.length === 0) {
      return []
    }

    return toManutencoesResponseDTO(manutencoes)
  }

  /**
   * Busca manutenções por especialidade
   * @param {string} especialidade - Nome da especialidade
   * @returns {Promise<ManutencaoResponseDTO[]>} Lista de manutenções com a especialidade
   */
  async findByEspecialidade(
    especialidade: string
  ): Promise<ManutencaoResponseDTO[]> {
    const manutencoes = await this.manutencaoRepository.findByEspecialidade(
      especialidade
    )

    if (!manutencoes || manutencoes.length === 0) {
      return []
    }

    return toManutencoesResponseDTO(manutencoes)
  }
}
