import type { Prisma } from '@prisma/client'

/**
 * Tipo completo do profissional com todos os relacionamentos
 * Inclui comentários associados ao profissional e seus likes
 * Utilizado para operações que necessitam de dados completos do profissional
 */
export type ProfissionalCompletions = Prisma.ProfissionalGetPayload<{
  include: {
    comentarios: {
      include: {
        likesUsuarios: true
      }
    }
    foto: true
  }
}>
