import { ProfissionalResponseDTO } from '../dtos/response/ProfissionalResponseDTO'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { IProfissionalService } from '../interfaces/services/IProfissionalService'
import {
  toCreateProfissionalDTO,
  toUpdateProfissionalDTO
} from '../mappers/input/profissionalInputMapper'
import {
  toProfissionaisResponseDTO,
  toProfissionalResponseDTO
} from '../mappers/output/profissionalOutputMapper'
import { throwIfAlreadyExists, throwIfNotFound } from '../utils/entityValidator'

export class ProfissionalService implements IProfissionalService {
  constructor(private profissionalRepository: IProfissionalAccess) {}

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

  async findById(id: string): Promise<ProfissionalResponseDTO> {
    const profissional = throwIfNotFound(
      await this.profissionalRepository.findById(id),
      'Profissional não encontrado.'
    )

    return toProfissionalResponseDTO(profissional)
  }

  async update(id: string, data: unknown): Promise<ProfissionalResponseDTO> {
    const existingProfissional = throwIfNotFound(
      await this.profissionalRepository.findById(id),
      'Profissional não encontrado.'
    )

    const updateData = await toUpdateProfissionalDTO(data)

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

  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.profissionalRepository.findById(id),
      'Profissional não encontrado.'
    )

    await this.profissionalRepository.delete(id)
  }

  async findAll(): Promise<ProfissionalResponseDTO[]> {
    const profissionais = await this.profissionalRepository.findAll()

    if (!profissionais || profissionais.length === 0) {
      return []
    }

    return toProfissionaisResponseDTO(profissionais)
  }
}
