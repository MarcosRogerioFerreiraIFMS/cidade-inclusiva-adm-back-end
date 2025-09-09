import { Prisma } from '@prisma/client'

/**
 * Tipo completo da mobilidade
 * Representa uma mobilidade com todos os seus campos e relacionamentos
 */
export type MobilidadeCompletions = Prisma.MobilidadeGetPayload<{
  include: { usuario: true }
}>
