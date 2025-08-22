import { Prisma } from '@prisma/client'

export type UsuarioCompletions = Prisma.UsuarioGetPayload<{
  include: { endereco: true }
}>
