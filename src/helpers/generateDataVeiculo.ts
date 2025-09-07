import { Prisma } from '@prisma/client'
import { db } from '../database/prisma'
import { VeiculoCreateDTO } from '../dtos/create/VeiculoCreateDTO'
import { VeiculoUpdateDTO } from '../dtos/update/VeiculoUpdateDTO'

/**
 * - Gera dados formatados para criação de veículo no Prisma
 * - Converte DTO de criação em input do Prisma, aplicando valores padrão
 * @param {VeiculoCreateDTO} data - Dados do veículo vindos do DTO
 * @returns {Prisma.VeiculoCreateInput} Dados formatados para o Prisma
 */
export function generateDataVeiculoCreate({
  placa,
  marca,
  modelo,
  cor,
  motoristaId,
  fotos = []
}: VeiculoCreateDTO): Prisma.VeiculoCreateInput {
  return {
    placa,
    marca,
    modelo,
    cor,
    motorista: {
      connect: {
        id: motoristaId
      }
    },
    fotos:
      fotos.length > 0
        ? {
            create: fotos.map((url) => ({ url }))
          }
        : undefined
  }
}

/**
 * Gera dados formatados para atualização de veículo no Prisma
 * Converte DTO de atualização em input do Prisma
 * Apenas campos definidos são incluídos na atualização
 * @param {VeiculoUpdateDTO} data - Dados de atualização vindos do DTO
 * @param {string} veiculoId - ID do veículo que está sendo atualizado
 * @returns {Promise<Prisma.VeiculoUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataVeiculoUpdate(
  { placa, marca, modelo, cor, motoristaId, fotos }: VeiculoUpdateDTO,
  veiculoId: string
): Promise<Prisma.VeiculoUpdateInput> {
  const dataToUpdate: Prisma.VeiculoUpdateInput = {}

  if (placa !== undefined) {
    dataToUpdate.placa = placa
  }
  if (marca !== undefined) {
    dataToUpdate.marca = marca
  }
  if (modelo !== undefined) {
    dataToUpdate.modelo = modelo
  }
  if (cor !== undefined) {
    dataToUpdate.cor = cor
  }
  if (motoristaId !== undefined) {
    dataToUpdate.motorista = {
      connect: {
        id: motoristaId
      }
    }
  }
  if (fotos !== undefined) {
    await db.$transaction(async (tx) => {
      const veiculo = await tx.veiculo.findUnique({
        where: { id: veiculoId },
        include: { fotos: true }
      })

      if (!veiculo) {
        throw new Error('Veículo não encontrado')
      }

      // Remove apenas as fotos que não estão nas URLs passadas
      const existingFotos = veiculo.fotos.map((foto) => foto.url)
      const fotosToRemove = existingFotos.filter(
        (urlExisting) => !fotos.includes(urlExisting)
      )

      if (fotosToRemove.length > 0) {
        await tx.foto.deleteMany({
          where: {
            veiculoId: veiculoId,
            url: {
              in: fotosToRemove
            }
          }
        })
      }

      // Adiciona apenas as novas fotos (que não existem)
      const newfotos = fotos.filter((url) => !existingFotos.includes(url))
      if (newfotos.length > 0) {
        dataToUpdate.fotos = {
          create: newfotos.map((url) => ({ url }))
        }
      }
    })
  }

  return dataToUpdate
}
