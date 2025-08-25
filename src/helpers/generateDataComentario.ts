import { Prisma } from '@prisma/client'
import { ComentarioCreateRelationalDTO } from '../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../dtos/update/ComentarioUpdateDTO'

export const generateDataComentarioCreate = ({
  conteudo,
  visivel,
  usuarioId,
  profissionalId
}: ComentarioCreateRelationalDTO): Prisma.ComentarioCreateInput => {
  return {
    conteudo: conteudo,
    visivel: visivel ?? true,
    usuario: {
      connect: {
        id: usuarioId
      }
    },
    ...(profissionalId !== undefined && {
      profissional: {
        connect: {
          id: profissionalId
        }
      }
    })
  }
}

export const generateDataComentarioUpdate = ({
  conteudo,
  visivel
}: ComentarioUpdateDTO): Prisma.ComentarioUpdateInput => {
  const dataToUpdate: Prisma.ComentarioUpdateInput = {}

  if (conteudo !== undefined) {
    dataToUpdate.conteudo = conteudo
  }

  if (visivel !== undefined) {
    dataToUpdate.visivel = visivel
  }

  dataToUpdate.atualizadoEm = new Date()

  return dataToUpdate
}
