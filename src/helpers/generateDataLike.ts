import type { LikeCreateWithUserDTO } from '@/dtos/create'
import type { Prisma } from '@prisma/client'

/**
 * - Gera dados formatados para criação de like no Prisma
 * - Converte DTO de criação em input do Prisma com relacionamentos
 * @param {LikeCreateWithUserDTO} data - Dados do like vindos do DTO (com usuarioId injetado)
 * @returns {Prisma.LikeCreateInput} Dados formatados para o Prisma
 */
export function generateDataLikeCreate({
  usuarioId,
  comentarioId
}: LikeCreateWithUserDTO): Prisma.LikeCreateInput {
  return {
    usuario: {
      connect: { id: usuarioId }
    },
    comentario: {
      connect: { id: comentarioId }
    }
  }
}
