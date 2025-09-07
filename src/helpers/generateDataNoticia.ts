import { Prisma } from '@prisma/client'
import { db } from '../database/prisma'
import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'

/**
 * - Gera dados formatados para criação de notícia no Prisma
 * - Converte DTO de criação em input do Prisma, aplicando valores padrão
 * @param {NoticiaCreateDTO} data - Dados da notícia vindos do DTO
 * @returns {Prisma.NoticiaCreateInput} Dados formatados para o Prisma
 */
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
    foto: {
      create: {
        url: foto ?? ''
      }
    },
    categoria,
    dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : new Date()
  }
}

/**
 * Gera dados formatados para atualização de notícia no Prisma
 * Converte DTO de atualização em input do Prisma
 * Apenas campos definidos são incluídos na atualização
 * @param {NoticiaUpdateDTO} data - Dados de atualização vindos do DTO
 * @param {string} noticiaId - ID da notícia que está sendo atualizada
 * @returns {Promise<Prisma.NoticiaUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataNoticiaUpdate(
  { titulo, conteudo, url, foto, categoria, dataPublicacao }: NoticiaUpdateDTO,
  noticiaId: string
): Promise<Prisma.NoticiaUpdateInput> {
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
    await db.$transaction(async (tx) => {
      const noticia = await tx.noticia.findUnique({
        where: { id: noticiaId },
        include: { foto: true }
      })

      if (!noticia) {
        throw new Error('Notícia não encontrada')
      }

      // Se não houver foto associada, cria uma nova
      if (!noticia.foto) {
        dataToUpdate.foto = { create: { url: foto } }
      }

      // Se já houver uma foto associada e ela for diferente da nova
      if (noticia.foto && noticia.foto.url !== foto) {
        await tx.foto.delete({ where: { id: noticia.foto.id } })

        // Cria uma nova foto
        dataToUpdate.foto = { create: { url: foto } }
      }
    })
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
