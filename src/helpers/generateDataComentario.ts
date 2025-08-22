import { Prisma } from '@prisma/client'

export const generateDataComentarioCreate = (data: {
  conteudo: string
  visivel?: boolean
  usuarioId: string
  profissionalId: string
}): Prisma.ComentarioCreateInput => {
  return {
    conteudo: data.conteudo,
    visivel: data.visivel ?? true,
    usuario: {
      connect: {
        id: data.usuarioId
      }
    },
    profissional: {
      connect: {
        id: data.profissionalId
      }
    }
  }
}

export const generateDataComentarioUpdate = (data: {
  conteudo?: string
  visivel?: boolean
}): Partial<Prisma.ComentarioUpdateInput> => {
  const dataToUpdate: Partial<Prisma.ComentarioUpdateInput> = {}

  if (data.conteudo !== undefined) {
    dataToUpdate.conteudo = data.conteudo
  }

  if (data.visivel !== undefined) {
    dataToUpdate.visivel = data.visivel
  }

  dataToUpdate.atualizadoEm = new Date()

  return dataToUpdate
}
