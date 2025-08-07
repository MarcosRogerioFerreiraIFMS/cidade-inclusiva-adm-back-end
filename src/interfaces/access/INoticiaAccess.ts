import { Noticia } from '@prisma/client'
import { NoticiaCreateDTO } from '../../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../../dtos/update/NoticiaUpdateDTO'

export interface INoticiaAccess {
  create(data: NoticiaCreateDTO): Promise<Noticia>
  findById(id: string): Promise<Noticia | null>
  update(id: string, data: NoticiaUpdateDTO): Promise<Noticia>
  delete(id: string): Promise<void>
  findAll(): Promise<Noticia[]>
}
