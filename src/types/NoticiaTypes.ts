import type { Prisma } from '@prisma/client'

/**
 * Tipo completo da notícia
 * Representa uma notícia com todos os seus campos
 * Baseado na entidade Noticia do Prisma sem relacionamentos adicionais
 */
// export type NoticiaCompletions = Noticia
export type NoticiaCompletions = Prisma.NoticiaGetPayload<{
  include: { foto: true }
}>
