import type { Prisma } from '@prisma/client'

/**
 * Tipo completo do comentário com todos os relacionamentos
 * Inclui likes associados ao comentário
 * Utilizado para operações que necessitam de dados completos do comentário
 */
export type ComentarioCompletions = Prisma.ComentarioGetPayload<{
  include: {
    likesUsuarios: true
  }
}>
