import { Prisma } from '@prisma/client'

export type ComentarioCompletions = Prisma.ComentarioGetPayload<{
  include: {
    likesUsuarios: true
  }
}>
