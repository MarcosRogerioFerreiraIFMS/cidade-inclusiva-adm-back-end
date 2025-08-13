import { Prisma } from '@prisma/client'
import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'

export function generateDataNoticiaCreate({
  titulo,
  conteudo,
  url,
  foto,
  categoria,
  dataPublicacao
}: NoticiaCreateDTO): Prisma.NoticiaCreateInput {
  return {
    titulo,
    conteudo,
    url: url ?? '',
    foto: foto ?? '',
    categoria,
    dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : new Date()
  }
}

export function generateDataNoticiaUpdate({
  titulo,
  conteudo,
  url,
  foto,
  categoria,
  dataPublicacao
}: NoticiaUpdateDTO): Prisma.NoticiaUpdateInput {
  const dataToUpdate: Prisma.NoticiaUpdateInput = {}

  if (titulo !== undefined) {
    dataToUpdate.titulo = titulo
  }
  if (conteudo !== undefined) {
    dataToUpdate.conteudo = conteudo
  }
  if (url !== undefined) {
    dataToUpdate.url = url
  }
  if (foto !== undefined) {
    dataToUpdate.foto = foto
  }
  if (categoria !== undefined) {
    dataToUpdate.categoria = categoria
  }
  if (dataPublicacao !== undefined) {
    const date = new Date(dataPublicacao)
    if (isNaN(date.getTime())) {
      throw new Error('Data de publicação inválida.')
    }
    dataToUpdate.dataPublicacao = date
  }

  return dataToUpdate
}
