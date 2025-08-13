import { ProfissionalResponseDTO } from '../../dtos/response/ProfissionalResponseDTO'

export interface IProfissionalService {
  create(data: unknown): Promise<ProfissionalResponseDTO>
  findById(id: string): Promise<ProfissionalResponseDTO>
  update(id: string, data: unknown): Promise<ProfissionalResponseDTO>
  delete(id: string): Promise<void>
  findAll(): Promise<ProfissionalResponseDTO[]>
}
