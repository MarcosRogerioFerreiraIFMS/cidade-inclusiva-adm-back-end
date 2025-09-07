import { Prisma } from '@prisma/client'
import { db } from '../database/prisma'
import { MotoristaCreateDTO } from '../dtos/create/MotoristaCreateDTO'
import { MotoristaUpdateDTO } from '../dtos/update/MotoristaUpdateDTO'

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
    foto: foto
      ? {
          create: {
            url: foto
          }
        }
      : undefined
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
    await db.$transaction(async (tx) => {
      const motorista = await tx.motorista.findUnique({
        where: { id: motoristaId },
        include: { foto: true }
      })

      if (!motorista) {
        throw new Error('Motorista não encontrado')
      }

      // Se não houver foto associada, cria uma nova
      if (!motorista.foto) {
        dataToUpdate.foto = { create: { url: foto } }
      }

      // Se já houver uma foto associada e ela for diferente da nova
      if (motorista.foto && motorista.foto.url !== foto) {
        await tx.foto.delete({ where: { id: motorista.foto.id } })

        // Cria uma nova foto
        dataToUpdate.foto = { create: { url: foto } }
      }
    })
  }

  return dataToUpdate
}
