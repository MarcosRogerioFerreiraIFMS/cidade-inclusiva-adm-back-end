import { Prisma } from '@prisma/client'
import { db } from '../database/prisma'
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
    foto: {
      create: {
        url: foto ?? ''
      }
    },
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
    await db.$transaction(async (tx) => {
      const profissional = await tx.profissional.findUnique({
        where: { id: profissionalId },
        include: { foto: true }
      })

      if (!profissional) {
        throw new Error('Profissional não encontrado')
      }

      // Se não houver foto associada, cria uma nova
      if (!profissional.foto) {
        dataToUpdate.foto = { create: { url: foto } }
      }

      // Se já houver uma foto associada e ela for diferente da nova
      if (profissional.foto && profissional.foto.url !== foto) {
        await tx.foto.delete({ where: { id: profissional.foto.id } })

        // Cria uma nova foto
        dataToUpdate.foto = { create: { url: foto } }
      }
    })
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
