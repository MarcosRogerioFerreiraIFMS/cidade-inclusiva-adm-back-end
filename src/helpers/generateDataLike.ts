import { Prisma } from '@prisma/client'
import { LikeCreateDTO } from '../dtos/create/LikeCreateDTO'

export function generateDataLikeCreate({
  usuarioId,
  comentarioId
}: LikeCreateDTO): Prisma.LikeCreateInput {
  return {
    usuario: {
      connect: { id: usuarioId }
    },
    comentario: {
      connect: { id: comentarioId }
    }
  }
}
