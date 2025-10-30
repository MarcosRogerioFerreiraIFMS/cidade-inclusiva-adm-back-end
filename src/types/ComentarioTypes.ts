import type { Prisma } from '@prisma/client'

/**
 * Tipo completo do comentário com todos os relacionamentos
 * Inclui autor (usuário) com foto e likes associados ao comentário
 * Utilizado para operações que necessitam de dados completos do comentário
 */
export type ComentarioCompletions = Prisma.ComentarioGetPayload<{
  include: {
    autor: {
      include: {
        foto: true
      }
    }
    likesUsuarios: true
  }
}>
