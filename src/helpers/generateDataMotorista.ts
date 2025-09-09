import { Prisma } from '@prisma/client'
import { MotoristaCreateDTO } from '../dtos/create'
import { MotoristaUpdateDTO } from '../dtos/update'
import {
  generateDataFotoMotoristaCreate,
  generateDataFotoMotoristaUpdate
} from './'

/**
 * - Gera dados formatados para criação de motorista no Prisma
 * - Converte DTO de criação em input do Prisma, aplicando valores padrão
 * @param {MotoristaCreateDTO} data - Dados do motorista vindos do DTO
 * @returns {Prisma.MotoristaCreateInput} Dados formatados para o Prisma
 */
export function generateDataMotoristaCreate({
  nome,
  telefone,
  email,
  foto
}: MotoristaCreateDTO): Prisma.MotoristaCreateInput {
  return {
    nome,
    telefone,
    email,
    foto: generateDataFotoMotoristaCreate(foto)
  }
}

/**
 * Gera dados formatados para atualização de motorista no Prisma
 * Converte DTO de atualização em input do Prisma
 * Apenas campos definidos são incluídos na atualização
 * @param {MotoristaUpdateDTO} data - Dados de atualização vindos do DTO
 * @param {string} motoristaId - ID do motorista que está sendo atualizado
 * @returns {Promise<Prisma.MotoristaUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataMotoristaUpdate(
  { nome, telefone, email, foto }: MotoristaUpdateDTO,
  motoristaId: string
): Promise<Prisma.MotoristaUpdateInput> {
  const dataToUpdate: Prisma.MotoristaUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (telefone !== undefined) {
    dataToUpdate.telefone = telefone
  }
  if (email !== undefined) {
    dataToUpdate.email = email
  }
  if (foto !== undefined) {
    const fotoUpdate = await generateDataFotoMotoristaUpdate(foto, motoristaId)
    if (fotoUpdate) {
      dataToUpdate.foto = fotoUpdate
    }
  }

  return dataToUpdate
}
