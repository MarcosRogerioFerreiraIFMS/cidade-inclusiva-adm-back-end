import { Prisma, TipoEntidade } from '@prisma/client'

interface ComentarioData {
  conteudo: string
  entidadeId: string
  entidadeTipo: TipoEntidade
  likes?: number
  visivel?: boolean
}

export function generateDataComentarioCreate({
  conteudo,
  entidadeId,
  entidadeTipo,
  likes = 0,
  visivel = true
}: ComentarioData): Prisma.ComentarioCreateInput {
  const associacao =
    entidadeTipo === 'PROFISSIONAL'
      ? { profissional: { connect: { id: entidadeId } } }
      : {}

  return {
    conteudo,
    entidadeTipo,
    likes,
    visivel,
    ...associacao
  }
}

export function generateDataComentarioUpdate({
  conteudo,
  likes,
  visivel
}: Partial<ComentarioData>): Prisma.ComentarioUpdateInput {
  const dataToUpdate: Prisma.ComentarioUpdateInput = {}

  if (conteudo !== undefined) {
    dataToUpdate.conteudo = conteudo
  }
  if (likes !== undefined) {
    dataToUpdate.likes = likes
  }
  if (visivel !== undefined) {
    dataToUpdate.visivel = visivel
  }

  return dataToUpdate
}
