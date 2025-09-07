import { Prisma } from '@prisma/client'

/**
 * Tipo completo do veículo
 * Representa um veículo com todos os seus campos e relacionamentos
 * Inclui motorista e fotos associados
 */
export type VeiculoCompletions = Prisma.VeiculoGetPayload<{
  include: { motorista: { include: { foto: true } }; fotos: true }
}>
