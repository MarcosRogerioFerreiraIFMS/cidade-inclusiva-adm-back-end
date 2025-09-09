import { MotoristaResponseDTO } from '../dtos/response'
import { IMotoristaAccess } from '../interfaces/access'
import { IMotoristaService } from '../interfaces/services'
import { toCreateMotoristaDTO, toUpdateMotoristaDTO } from '../mappers/input'
import {
  toMotoristaResponseDTO,
  toMotoristasResponseDTO
} from '../mappers/output'
import { throwIfAlreadyExists, throwIfNotFound } from '../utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a motoristas:
 * - Implementa a interface IMotoristaService e gerencia operações CRUD de motoristas
 * - Aplica validações, transformações de dados e regras de negócio específicas
 */
export class MotoristaService implements IMotoristaService {
  /**
   * Construtor do serviço de motoristas
   * @param {IMotoristaAccess} motoristaRepository - Repositório para acesso aos dados de motoristas
   */
  constructor(private motoristaRepository: IMotoristaAccess) {}

  /**
   * Cria um novo motorista no sistema:
   * - Valida os dados de entrada e transforma em DTO apropriado
   * - Verifica se já existe motorista com mesmo telefone ou email
   * @param {unknown} data - Dados do motorista a ser criado
   * @returns {Promise<MotoristaResponseDTO>} Dados do motorista criado
   */
  async create(data: unknown): Promise<MotoristaResponseDTO> {
    const motoristaData = await toCreateMotoristaDTO(data)

    // Verificar se já existe motorista com o mesmo telefone
    const existingByTelefone = await this.motoristaRepository.findByTelefone(
      motoristaData.telefone
    )
    throwIfAlreadyExists(
      existingByTelefone,
      'Já existe um motorista cadastrado com este telefone.'
    )

    // Verificar se já existe motorista com o mesmo email
    const existingByEmail = await this.motoristaRepository.findByEmail(
      motoristaData.email
    )
    throwIfAlreadyExists(
      existingByEmail,
      'Já existe um motorista cadastrado com este email.'
    )

    return toMotoristaResponseDTO(
      await this.motoristaRepository.create(motoristaData)
    )
  }

  /**
   * Busca um motorista específico por ID:
   * - Valida a existência do motorista e retorna erro se não encontrado
   * @param {string} id - ID único do motorista
   * @returns {Promise<MotoristaResponseDTO>} Dados do motorista encontrado
   */
  async findById(id: string): Promise<MotoristaResponseDTO> {
    const motorista = throwIfNotFound(
      await this.motoristaRepository.findById(id),
      'Motorista não encontrado.'
    )

    return toMotoristaResponseDTO(motorista)
  }

  /**
   * Atualiza os dados de um motorista existente:
   * - Valida a existência do motorista
   * - Verifica conflitos com telefone e email se estiverem sendo alterados
   * - Aplica as atualizações apenas nos campos fornecidos
   * @param {string} id - ID único do motorista
   * @param {unknown} data - Dados a serem atualizados
   * @returns {Promise<MotoristaResponseDTO>} Dados do motorista atualizado
   */
  async update(id: string, data: unknown): Promise<MotoristaResponseDTO> {
    throwIfNotFound(
      await this.motoristaRepository.findById(id),
      'Motorista não encontrado.'
    )

    const updateData = await toUpdateMotoristaDTO(data)

    // Se o telefone está sendo atualizado, verificar se já existe
    if (updateData.telefone) {
      const existingByTelefone = await this.motoristaRepository.findByTelefone(
        updateData.telefone
      )
      if (existingByTelefone && existingByTelefone.id !== id) {
        throwIfAlreadyExists(
          existingByTelefone,
          'Já existe um motorista cadastrado com este telefone.'
        )
      }
    }

    // Se o email está sendo atualizado, verificar se já existe
    if (updateData.email) {
      const existingByEmail = await this.motoristaRepository.findByEmail(
        updateData.email
      )
      if (existingByEmail && existingByEmail.id !== id) {
        throwIfAlreadyExists(
          existingByEmail,
          'Já existe um motorista cadastrado com este email.'
        )
      }
    }

    const motorista = await this.motoristaRepository.update(id, updateData)

    return toMotoristaResponseDTO(motorista)
  }

  /**
   * Remove um motorista do sistema:
   * - Valida a existência do motorista antes da remoção
   * @param {string} id - ID único do motorista a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.motoristaRepository.findById(id),
      'Motorista não encontrado.'
    )

    await this.motoristaRepository.delete(id)
  }

  /**
   * Recupera todos os motoristas do sistema:
   * - Retorna lista vazia se não houver motoristas
   * @returns {Promise<MotoristaResponseDTO[]>} Lista de todos os motoristas
   */
  async findAll(): Promise<MotoristaResponseDTO[]> {
    const motoristas = await this.motoristaRepository.findAll()

    if (!motoristas || motoristas.length === 0) {
      return []
    }

    return toMotoristasResponseDTO(motoristas)
  }
}
