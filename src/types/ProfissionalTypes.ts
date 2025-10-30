import type { Prisma } from '@prisma/client'

/**
 * Tipo completo do profissional com todos os relacionamentos
 * Inclui comentários com autor, foto e likes associados
 * Utilizado para operações que necessitam de dados completos do profissional
 */
export type ProfissionalCompletions = Prisma.ProfissionalGetPayload<{
  include: {
    foto: true
  }
}>
