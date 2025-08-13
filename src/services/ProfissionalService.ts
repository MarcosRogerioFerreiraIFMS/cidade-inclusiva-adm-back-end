import { ProfissionalResponseDTO } from '../dtos/response/ProfissionalResponseDTO'
import { HttpStatusCode } from '../enums/HttpStatusCode'
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
import { HttpError } from '../utils/HttpError'

export class ProfissionalService implements IProfissionalService {
  constructor(private profissionalRepository: IProfissionalAccess) {}

  async create(data: unknown): Promise<ProfissionalResponseDTO> {
    const profissionalData = await toCreateProfissionalDTO(data)

    const existingProfissional = await this.profissionalRepository.findByEmail(
      profissionalData.email
    )

    if (existingProfissional) {
      throw new HttpError(
        'Já existe um profissional cadastrado com este email.',
        HttpStatusCode.CONFLICT
      )
    }

    const profissional = await this.profissionalRepository.create(
      profissionalData
    )

    return toProfissionalResponseDTO(profissional)
  }

  async findById(id: string): Promise<ProfissionalResponseDTO> {
    const profissional = await this.profissionalRepository.findById(id)

    if (!profissional) {
      throw new HttpError(
        'Profissional não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    return toProfissionalResponseDTO(profissional)
  }

  async update(id: string, data: unknown): Promise<ProfissionalResponseDTO> {
    const existingProfissional = await this.profissionalRepository.findById(id)
    if (!existingProfissional) {
      throw new HttpError(
        'Profissional não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    const updateData = await toUpdateProfissionalDTO(data)

    if (updateData.email && updateData.email !== existingProfissional.email) {
      const profissionalWithEmail =
        await this.profissionalRepository.findByEmail(updateData.email)

      if (profissionalWithEmail && profissionalWithEmail.id !== id) {
        throw new HttpError(
          'Já existe um profissional cadastrado com este email.',
          HttpStatusCode.CONFLICT
        )
      }
    }

    const profissional = await this.profissionalRepository.update(
      id,
      updateData
    )

    return toProfissionalResponseDTO(profissional)
  }

  async delete(id: string): Promise<void> {
    const profissional = await this.profissionalRepository.findById(id)
    if (!profissional) {
      throw new HttpError(
        'Profissional não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

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
