import { Prisma } from '@prisma/client'
import { MobilidadeCreateDTO } from '../dtos/create'
import { MobilidadeUpdateDTO } from '../dtos/update'

/**
 * - Gera dados formatados para criação de mobilidade no Prisma
 * - Converte DTO de criação em input do Prisma, aplicando valores padrão
 * @param {MobilidadeCreateDTO} data - Dados da mobilidade vindos do DTO
 * @param {string} userId - ID do usuário que está criando a mobilidade
 * @returns {Prisma.MobilidadeCreateInput} Dados formatados para o Prisma
 */
export function generateDataMobilidadeCreate(
  { latitude, longitude, descricao, status, dataRegistro }: MobilidadeCreateDTO,
  userId: string
): Prisma.MobilidadeCreateInput {
  const data: Prisma.MobilidadeCreateInput = {
    latitude,
    longitude,
    descricao,
    status: status || 'PENDENTE',
    dataRegistro: dataRegistro ? new Date(dataRegistro) : new Date()
  }

  if (userId) {
    data.usuario = {
      connect: { id: userId }
    }
  }

  return data
}

/**
 * Gera dados formatados para atualização de mobilidade no Prisma
 * Converte DTO de atualização em input do Prisma
 * Apenas campos definidos são incluídos na atualização
 * @param {MobilidadeUpdateDTO} data - Dados de atualização vindos do DTO
 * @returns {Prisma.MobilidadeUpdateInput} Dados formatados para o Prisma
 */
export function generateDataMobilidadeUpdate({
  latitude,
  longitude,
  descricao,
  status,
  usuarioId,
  dataRegistro
}: MobilidadeUpdateDTO): Prisma.MobilidadeUpdateInput {
  const dataToUpdate: Prisma.MobilidadeUpdateInput = {}

  if (latitude !== undefined) {
    dataToUpdate.latitude = latitude
  }
  if (longitude !== undefined) {
    dataToUpdate.longitude = longitude
  }
  if (descricao !== undefined) {
    dataToUpdate.descricao = descricao
  }
  if (status !== undefined) {
    dataToUpdate.status = status
  }
  if (usuarioId !== undefined) {
    if (usuarioId === null) {
      dataToUpdate.usuario = {
        disconnect: true
      }
    } else {
      dataToUpdate.usuario = {
        connect: { id: usuarioId }
      }
    }
  }
  if (dataRegistro !== undefined) {
    const date = new Date(dataRegistro)
    if (isNaN(date.getTime())) {
      throw new Error('Data de registro inválida.')
    }
    dataToUpdate.dataRegistro = date
  }

  return dataToUpdate
}
