import type { Prisma } from '@prisma/client'

/**
 * Tipo completo da acessibilidade urbana com todos os relacionamentos
 * Inclui dados do endereço, fotos, logo e recursos associados à acessibilidade urbana
 * Utilizado para operações que necessitam de dados completos da acessibilidade urbana
 */
export type AcessibilidadeUrbanaCompletions =
  Prisma.AcessibilidadeUrbanaGetPayload<{
    include: {
      endereco: true
      fotos: true
      logo: true
      recursos: true
    }
  }>
