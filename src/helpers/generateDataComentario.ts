import { Prisma } from '@prisma/client'
import { ComentarioCreateRelationalDTO } from '../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../dtos/update/ComentarioUpdateDTO'

/**
 * - Gera dados formatados para criação de comentário no Prisma
 * - Converte DTO de criação em input do Prisma com relacionamentos
 * @param {ComentarioCreateRelationalDTO} data - Dados do comentário vindos do DTO
 * @returns {Prisma.ComentarioCreateInput} Dados formatados para o Prisma
 */
export const generateDataComentarioCreate = ({
  conteudo,
  usuarioId,
  profissionalId
}: ComentarioCreateRelationalDTO): Prisma.ComentarioCreateInput => {
  return {
    conteudo: conteudo,
    visivel: true, // Comentários são visíveis por padrão
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

/**
 * - Gera dados formatados para atualização de comentário no Prisma
 * - Converte DTO de atualização em input do Prisma
 * - Apenas campos definidos são incluídos na atualização
 * @param {ComentarioUpdateDTO} data - Dados de atualização vindos do DTO
 * @returns {Prisma.ComentarioUpdateInput} Dados formatados para o Prisma
 */
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
