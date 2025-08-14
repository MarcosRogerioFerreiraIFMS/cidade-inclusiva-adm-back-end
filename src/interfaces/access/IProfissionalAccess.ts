import { Comentario, Profissional } from '@prisma/client'
import { ProfissionalCreateDTO } from '../../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../../dtos/update/ProfissionalUpdateDTO'

export interface IProfissionalAccess {
  create(data: ProfissionalCreateDTO): Promise<Profissional>
  findById(
    id: string
  ): Promise<(Profissional & { comentarios: Comentario[] }) | null>
  findByEmail(
    email: string
  ): Promise<(Profissional & { comentarios: Comentario[] }) | null>
  update(
    id: string,
    data: ProfissionalUpdateDTO
  ): Promise<Profissional & { comentarios: Comentario[] }>
  delete(id: string): Promise<void>
  findAll(): Promise<(Profissional & { comentarios: Comentario[] })[]>
}
