import type { Prisma } from '@prisma/client'

/**
 * Tipo completo do motorista
 * Representa um motorista com todos os seus campos e relacionamentos
 * Inclui foto e veículo associados
 */
export type MotoristaCompletions = Prisma.MotoristaGetPayload<{
  include: { foto: true; veiculo: { include: { fotos: true } } }
}>
