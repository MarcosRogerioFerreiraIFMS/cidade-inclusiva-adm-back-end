import { VeiculoResponseDTO } from '../dtos/response'
import { IMotoristaAccess, IVeiculoAccess } from '../interfaces/access'
import { IVeiculoService } from '../interfaces/services'
import { toCreateVeiculoDTO, toUpdateVeiculoDTO } from '../mappers/input'
import { toVeiculoResponseDTO, toVeiculosResponseDTO } from '../mappers/output'
import { throwIfAlreadyExists, throwIfNotFound } from '../utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a veículos:
 * - Implementa a interface IVeiculoService e gerencia operações CRUD de veículos
 * - Aplica validações, transformações de dados e regras de negócio específicas
 */
export class VeiculoService implements IVeiculoService {
  /**
   * Construtor do serviço de veículos
   * @param {IVeiculoAccess} veiculoRepository - Repositório para acesso aos dados de veículos
   */
  constructor(
    private veiculoRepository: IVeiculoAccess,
    private motoristaRepository: IMotoristaAccess
  ) {}

  /**
   * Cria um novo veículo no sistema:
   * - Valida os dados de entrada e transforma em DTO apropriado
   * - Verifica se já existe veículo com mesma placa
   * - Verifica se o motorista já possui um veículo (relação 1:1)
   * @param {unknown} data - Dados do veículo a ser criado
   * @returns {Promise<VeiculoResponseDTO>} Dados do veículo criado
   */
  async create(data: unknown): Promise<VeiculoResponseDTO> {
    const veiculoData = await toCreateVeiculoDTO(data)

    // Verificar se já existe veículo com a mesma placa
    const existingByPlaca = await this.veiculoRepository.findByPlaca(
      veiculoData.placa
    )
    throwIfAlreadyExists(
      existingByPlaca,
      'Já existe um veículo cadastrado com esta placa.'
    )

    // Verificar se o motorista existe
    throwIfNotFound(
      await this.motoristaRepository.findById(veiculoData.motoristaId),
      'Motorista não encontrado.'
    )

    // Verificar se o motorista já possui um veículo (relação 1:1)
    const existingByMotorista = await this.veiculoRepository.findByMotoristaId(
      veiculoData.motoristaId
    )
    throwIfAlreadyExists(
      existingByMotorista,
      'Este motorista já possui um veículo cadastrado.'
    )

    return toVeiculoResponseDTO(
      await this.veiculoRepository.create(veiculoData)
    )
  }

  /**
   * Busca um veículo específico por ID:
   * - Valida a existência do veículo e retorna erro se não encontrado
   * @param {string} id - ID único do veículo
   * @returns {Promise<VeiculoResponseDTO>} Dados do veículo encontrado
   */
  async findById(id: string): Promise<VeiculoResponseDTO> {
    const veiculo = throwIfNotFound(
      await this.veiculoRepository.findById(id),
      'Veículo não encontrado.'
    )

    return toVeiculoResponseDTO(veiculo)
  }

  /**
   * Atualiza os dados de um veículo existente:
   * - Valida a existência do veículo
   * - Verifica conflitos com placa e motorista se estiverem sendo alterados
   * - Aplica as atualizações apenas nos campos fornecidos
   * @param {string} id - ID único do veículo
   * @param {unknown} data - Dados a serem atualizados
   * @returns {Promise<VeiculoResponseDTO>} Dados do veículo atualizado
   */
  async update(id: string, data: unknown): Promise<VeiculoResponseDTO> {
    throwIfNotFound(
      await this.veiculoRepository.findById(id),
      'Veículo não encontrado.'
    )

    const updateData = await toUpdateVeiculoDTO(data)

    // Se a placa está sendo atualizada, verificar se já existe
    if (updateData.placa) {
      const existingByPlaca = await this.veiculoRepository.findByPlaca(
        updateData.placa
      )
      if (existingByPlaca && existingByPlaca.id !== id) {
        throwIfAlreadyExists(
          existingByPlaca,
          'Já existe um veículo cadastrado com esta placa.'
        )
      }
    }

    // Se o motorista está sendo alterado, verificar se o novo motorista já possui veículo
    if (updateData.motoristaId) {
      const existingByMotorista =
        await this.veiculoRepository.findByMotoristaId(updateData.motoristaId)
      if (existingByMotorista && existingByMotorista.id !== id) {
        throwIfAlreadyExists(
          existingByMotorista,
          'Este motorista já possui um veículo cadastrado.'
        )
      }
    }

    const veiculo = await this.veiculoRepository.update(id, updateData)

    return toVeiculoResponseDTO(veiculo)
  }

  /**
   * Remove um veículo do sistema:
   * - Valida a existência do veículo antes da remoção
   * @param {string} id - ID único do veículo a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.veiculoRepository.findById(id),
      'Veículo não encontrado.'
    )

    await this.veiculoRepository.delete(id)
  }

  /**
   * Recupera todos os veículos do sistema:
   * - Retorna lista vazia se não houver veículos
   * @returns {Promise<VeiculoResponseDTO[]>} Lista de todos os veículos
   */
  async findAll(): Promise<VeiculoResponseDTO[]> {
    const veiculos = await this.veiculoRepository.findAll()

    if (!veiculos || veiculos.length === 0) {
      return []
    }

    return toVeiculosResponseDTO(veiculos)
  }
}
