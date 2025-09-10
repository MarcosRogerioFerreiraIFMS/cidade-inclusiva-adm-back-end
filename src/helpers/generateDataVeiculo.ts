import { VeiculoCreateDTO } from '@/dtos/create'
import { VeiculoUpdateDTO } from '@/dtos/update'
import { Prisma } from '@prisma/client'
import {
  generateDataFotosVeiculoCreate,
  generateDataFotosVeiculoUpdate
} from './'

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
    fotos: generateDataFotosVeiculoCreate(fotos)
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
    const fotosUpdate = await generateDataFotosVeiculoUpdate(fotos, veiculoId)
    if (fotosUpdate) {
      dataToUpdate.fotos = fotosUpdate
    }
  }

  return dataToUpdate
}
