import { ComentarioCreateRelationalDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'
import { ComentarioCompletions } from '../../types/ComentarioTypes'

export interface IComentarioAccess {
  create(data: ComentarioCreateRelationalDTO): Promise<ComentarioCompletions>
  findById(id: string): Promise<ComentarioCompletions | null>
  update(id: string, data: ComentarioUpdateDTO): Promise<ComentarioCompletions>
  delete(id: string): Promise<void>
  findAll(): Promise<ComentarioCompletions[]>
  findByProfissional(profissionalId: string): Promise<ComentarioCompletions[]>
  findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioCompletions[]>
}
