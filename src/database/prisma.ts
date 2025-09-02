import { PrismaClient } from '@prisma/client'

/**
 * Declaração global para caching da instância Prisma em desenvolvimento
 * Evita múltiplas conexões durante hot reloads
 */
declare global {
  var cachedPrisma: PrismaClient
}

/**
 * Instância do Prisma Client com gerenciamento otimizado de conexões
 * - Em produção: Nova instância para cada deploy
 * - Em desenvolvimento: Instância cacheada globalmente para evitar múltiplas conexões
 */
let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

/**
 * - Cliente Prisma exportado para uso em toda a aplicação
 * - Centraliza o acesso ao banco de dados
 */
export const db = prisma
