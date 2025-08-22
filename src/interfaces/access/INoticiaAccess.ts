import { NoticiaCreateDTO } from '../../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../../dtos/update/NoticiaUpdateDTO'
import { NoticiaCompletions } from '../../types/NoticiaTypes'

export interface INoticiaAccess {
  create(data: NoticiaCreateDTO): Promise<NoticiaCompletions>
  findById(id: string): Promise<NoticiaCompletions | null>
  update(id: string, data: NoticiaUpdateDTO): Promise<NoticiaCompletions>
  delete(id: string): Promise<void>
  findAll(): Promise<NoticiaCompletions[]>
}
