import { Prisma } from '@prisma/client'

export type ProfissionalCompletions = Prisma.ProfissionalGetPayload<{
  include: {
    comentarios: {
      include: {
        likesUsuarios: true
      }
    }
  }
}>
