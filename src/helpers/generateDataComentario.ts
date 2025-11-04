import type { ComentarioCreateRelationalDTO } from '@/dtos/create'
import type { ComentarioUpdateDTO } from '@/dtos/update'
import type { Prisma } from '@prisma/client'

/**
 * - Gera dados formatados para criação de comentário no Prisma
 * - Converte DTO de criação em input do Prisma com relacionamentos
 * @param {ComentarioCreateRelationalDTO} data - Dados do comentário vindos do DTO
 * @returns {Prisma.ComentarioCreateInput} Dados formatados para o Prisma
 */
export const generateDataComentarioCreate = ({
  conteudo,
  nota,
  usuarioId,
  profissionalId,
  motoristaId,
  manutencaoId,
  acessibilidadeUrbanaId
}: ComentarioCreateRelationalDTO): Prisma.ComentarioCreateInput => {
  return {
    conteudo,
    nota,
    visivel: true,
    autor: {
      connect: {
        id: usuarioId
      }
    },
    ...(profissionalId && {
      profissional: {
        connect: {
          id: profissionalId
        }
      }
    }),
    ...(motoristaId && {
      motorista: {
        connect: {
          id: motoristaId
        }
      }
    }),
    ...(manutencaoId && {
      manutencao: {
        connect: {
          id: manutencaoId
        }
      }
    }),
    ...(acessibilidadeUrbanaId && {
      acessibilidadeUrbana: {
        connect: {
          id: acessibilidadeUrbanaId
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
  nota,
  visivel
}: ComentarioUpdateDTO): Prisma.ComentarioUpdateInput => {
  const dataToUpdate: Prisma.ComentarioUpdateInput = {}

  if (conteudo !== undefined) {
    dataToUpdate.conteudo = conteudo
  }

  if (nota !== undefined) {
    dataToUpdate.nota = nota
  }

  if (visivel !== undefined) {
    dataToUpdate.visivel = visivel
  }

  dataToUpdate.atualizadoEm = new Date()

  return dataToUpdate
}
