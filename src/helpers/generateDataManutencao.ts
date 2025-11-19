import type { ManutencaoCreateDTO } from '@/dtos/create'
import type { ManutencaoUpdateDTO } from '@/dtos/update'
import type { Prisma } from '@prisma/client'
import {
  generateDataFotoManutencaoCreate,
  generateDataFotoManutencaoUpdate,
  generateDataLogoManutencaoCreate,
  generateDataLogoManutencaoUpdate
} from './generateDataFoto'

/**
 * - Gera dados formatados para criação de manutenção no Prisma
 * - Converte DTO de criação em input do Prisma, incluindo criação do endereço, fotos, logo e especialidades
 * @param {ManutencaoCreateDTO} data - Dados da manutenção vindos do DTO
 * @returns {Prisma.ManutencaoCreateInput} Dados formatados para o Prisma
 */
export function generateDataManutencaoCreate({
  nome,
  telefone,
  email,
  fotos,
  logo,
  especialidades,
  endereco
}: ManutencaoCreateDTO): Prisma.ManutencaoCreateInput {
  return {
    nome,
    telefone,
    email,
    fotos: generateDataFotoManutencaoCreate(fotos || []),
    logo: generateDataLogoManutencaoCreate(logo),
    endereco: {
      create: {
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento ?? null,
        cidade: endereco.cidade,
        bairro: endereco.bairro,
        cep: endereco.cep,
        estado: endereco.estado,
        pais: endereco.pais ?? 'Brasil'
      }
    },
    especialidades: {
      create: especialidades.map((tipo) => ({
        tipo
      }))
    }
  }
}

/**
 * - Gera dados formatados para atualização de manutenção no Prisma
 * - Converte DTO de atualização em input do Prisma, incluindo upsert do endereço e atualização de especialidades
 * - Apenas campos definidos são incluídos na atualização
 * @param {ManutencaoUpdateDTO} data - Dados de atualização vindos do DTO
 * @param {string} manutencaoId - ID da manutenção que está sendo atualizada
 * @returns {Promise<Prisma.ManutencaoUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataManutencaoUpdate(
  {
    nome,
    telefone,
    email,
    fotos,
    logo,
    especialidades,
    endereco
  }: ManutencaoUpdateDTO,
  manutencaoId: string
): Promise<Prisma.ManutencaoUpdateInput> {
  const dataToUpdate: Prisma.ManutencaoUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (telefone !== undefined) {
    dataToUpdate.telefone = telefone
  }
  if (email !== undefined) {
    dataToUpdate.email = email
  }
  if (fotos !== undefined) {
    const fotosUpdate = await generateDataFotoManutencaoUpdate(
      fotos,
      manutencaoId
    )
    if (fotosUpdate) {
      dataToUpdate.fotos = fotosUpdate
    }
  }
  if (logo !== undefined) {
    const logoUpdate = await generateDataLogoManutencaoUpdate(
      logo,
      manutencaoId
    )
    if (logoUpdate) {
      dataToUpdate.logo = logoUpdate
    }
  }

  if (endereco) {
    const enderecoUpdate: Prisma.EnderecoUpdateInput = {}
    const enderecoCreate: Prisma.EnderecoCreateWithoutManutencaoInput = {
      logradouro: '',
      numero: '',
      cidade: '',
      bairro: '',
      cep: '',
      estado: '',
      pais: 'Brasil'
    }

    if (endereco.logradouro !== undefined) {
      enderecoUpdate.logradouro = endereco.logradouro
      enderecoCreate.logradouro = endereco.logradouro
    }
    if (endereco.numero !== undefined) {
      enderecoUpdate.numero = endereco.numero
      enderecoCreate.numero = endereco.numero
    }
    if (endereco.complemento !== undefined) {
      enderecoUpdate.complemento = endereco.complemento
      enderecoCreate.complemento = endereco.complemento
    }
    if (endereco.cidade !== undefined) {
      enderecoUpdate.cidade = endereco.cidade
      enderecoCreate.cidade = endereco.cidade
    }
    if (endereco.bairro !== undefined) {
      enderecoUpdate.bairro = endereco.bairro
      enderecoCreate.bairro = endereco.bairro
    }
    if (endereco.cep !== undefined) {
      enderecoUpdate.cep = endereco.cep
      enderecoCreate.cep = endereco.cep
    }
    if (endereco.estado !== undefined) {
      enderecoUpdate.estado = endereco.estado
      enderecoCreate.estado = endereco.estado
    }
    if (endereco.pais !== undefined) {
      enderecoUpdate.pais = endereco.pais
      enderecoCreate.pais = endereco.pais
    }

    dataToUpdate.endereco = {
      upsert: {
        create: enderecoCreate,
        update: enderecoUpdate
      }
    }
  }

  if (especialidades !== undefined) {
    // Remove todas as especialidades existentes e cria as novas
    dataToUpdate.especialidades = {
      deleteMany: {},
      create: especialidades.map((tipo) => ({
        tipo
      }))
    }
  }

  return dataToUpdate
}
