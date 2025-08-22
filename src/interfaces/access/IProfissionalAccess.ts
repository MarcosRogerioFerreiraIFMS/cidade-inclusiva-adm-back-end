import { ProfissionalCreateDTO } from '../../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../../dtos/update/ProfissionalUpdateDTO'
import { ProfissionalCompletions } from '../../types/ProfissionalTypes'

export interface IProfissionalAccess {
  create(data: ProfissionalCreateDTO): Promise<ProfissionalCompletions>
  findById(id: string): Promise<ProfissionalCompletions | null>
  findByEmail(email: string): Promise<ProfissionalCompletions | null>
  findByTelefone(telefone: string): Promise<ProfissionalCompletions | null>
  update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<ProfissionalCompletions>
  delete(id: string): Promise<void>
  findAll(): Promise<ProfissionalCompletions[]>
}
