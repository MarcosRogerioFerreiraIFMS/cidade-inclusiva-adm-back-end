import type { Foto } from '@prisma/client'

/**
 * Tipo completo da foto
 * Representa uma foto com todos os seus campos
 * Baseado na entidade Foto do Prisma sem relacionamentos adicionais
 */
export type FotoCompletions = Foto

/**
 * Tipo completo da logo
 * Representa uma logo com todos os seus campos
 * Baseado na entidade Foto do Prisma sem relacionamentos adicionais
 */
export type LogoCompletions = FotoCompletions
