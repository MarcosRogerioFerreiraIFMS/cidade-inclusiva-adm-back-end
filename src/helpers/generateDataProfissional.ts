import { Prisma } from '@prisma/client'
import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'

/**
 * - Gera dados formatados para criação de profissional no Prisma
 * - Converte DTO de criação em input do Prisma, aplicando valores padrão
 * @param {ProfissionalCreateDTO} data - Dados do profissional vindos do DTO
 * @returns {Prisma.ProfissionalCreateInput} Dados formatados para o Prisma
 */
export function generateDataProfissionalCreate({
  nome,
  foto,
  telefone,
  email,
  especialidade
}: ProfissionalCreateDTO): Prisma.ProfissionalCreateInput {
  return {
    nome,
    foto: foto ?? null,
    telefone,
    email,
    especialidade
  }
}

/**
 * - Gera dados formatados para atualização de profissional no Prisma
 * - Converte DTO de atualização em input do Prisma
 * - Apenas campos definidos são incluídos na atualização
 * @param {ProfissionalUpdateDTO} data - Dados de atualização vindos do DTO
 * @returns {Prisma.ProfissionalUpdateInput} Dados formatados para o Prisma
 */
export function generateDataProfissionalUpdate({
  nome,
  foto,
  telefone,
  email,
  especialidade
}: ProfissionalUpdateDTO): Prisma.ProfissionalUpdateInput {
  const dataToUpdate: Prisma.ProfissionalUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (foto !== undefined) {
    dataToUpdate.foto = foto
  }
  if (telefone !== undefined) {
    dataToUpdate.telefone = telefone
  }
  if (email !== undefined) {
    dataToUpdate.email = email
  }
  if (especialidade !== undefined) {
    dataToUpdate.especialidade = especialidade
  }

  return dataToUpdate
}
