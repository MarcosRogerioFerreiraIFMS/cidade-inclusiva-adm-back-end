import { Comentario } from '@prisma/client'
import { ComentarioCreateDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'

export interface IComentarioAccess {
  create(data: ComentarioCreateDTO): Promise<Comentario>
  findById(id: string): Promise<Comentario | null>
  update(id: string, data: ComentarioUpdateDTO): Promise<Comentario>
  delete(id: string): Promise<void>
  findAll(): Promise<Comentario[]>
  findByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<Comentario[]>
  findVisibleByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<Comentario[]>
  incrementLikes(id: string, increment: number): Promise<Comentario>
}
