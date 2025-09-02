import { Prisma } from '@prisma/client'

/**
 * Tipo completo do usuário com todos os relacionamentos
 * Inclui dados do endereço associado ao usuário
 * Utilizado para operações que necessitam de dados completos do usuário
 */
export type UsuarioCompletions = Prisma.UsuarioGetPayload<{
  include: { endereco: true }
}>
