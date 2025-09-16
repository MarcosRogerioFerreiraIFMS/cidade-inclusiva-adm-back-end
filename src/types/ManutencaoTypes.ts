import type { Prisma } from '@prisma/client'

/**
 * Tipo completo da manutenção com todos os relacionamentos
 * Inclui dados do endereço, fotos e logo associados à manutenção
 * Utilizado para operações que necessitam de dados completos da manutenção
 */
export type ManutencaoCompletions = Prisma.ManutencaoGetPayload<{
  include: {
    endereco: true
    fotos: true
    logo: true
    especialidades: true
  }
}>
