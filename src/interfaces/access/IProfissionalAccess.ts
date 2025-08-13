import { Profissional } from '@prisma/client'
import { ProfissionalCreateDTO } from '../../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../../dtos/update/ProfissionalUpdateDTO'

export interface IProfissionalAccess {
  create(data: ProfissionalCreateDTO): Promise<Profissional>
  findById(id: string): Promise<Profissional | null>
  findByEmail(email: string): Promise<Profissional | null>
  update(id: string, data: ProfissionalUpdateDTO): Promise<Profissional>
  delete(id: string): Promise<void>
  findAll(): Promise<Profissional[]>
}
