import { Prisma } from '@prisma/client'
import { ProfissionalCreateDTO } from '../dtos/create'
import { ProfissionalUpdateDTO } from '../dtos/update'
import {
  generateDataFotoProfissionalCreate,
  generateDataFotoProfissionalUpdate
} from './'

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
    foto: generateDataFotoProfissionalCreate(foto),
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
 * @param {string} profissionalId - ID do profissional que está sendo atualizado
 * @returns {Promise<Prisma.ProfissionalUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataProfissionalUpdate(
  { nome, foto, telefone, email, especialidade }: ProfissionalUpdateDTO,
  profissionalId: string
): Promise<Prisma.ProfissionalUpdateInput> {
  const dataToUpdate: Prisma.ProfissionalUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (foto !== undefined) {
    const fotoUpdate = await generateDataFotoProfissionalUpdate(
      foto,
      profissionalId
    )
    if (fotoUpdate) {
      dataToUpdate.foto = fotoUpdate
    }
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
