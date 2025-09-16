import type { AcessibilidadeUrbanaCreateDTO } from '@/dtos/create'
import type { AcessibilidadeUrbanaUpdateDTO } from '@/dtos/update'
import type { Prisma } from '@prisma/client'
import {
  generateDataLogoAcessibilidadeUrbanaCreate,
  generateDataLogoAcessibilidadeUrbanaUpdate
} from './generateDataFoto'

/**
 * - Gera dados formatados para criação de acessibilidade urbana no Prisma
 * - Converte DTO de criação em input do Prisma, incluindo criação do endereço, fotos, logo e recursos
 * @param {AcessibilidadeUrbanaCreateDTO} data - Dados da acessibilidade urbana vindos do DTO
 * @returns {Prisma.AcessibilidadeUrbanaCreateInput} Dados formatados para o Prisma
 */
export function generateDataAcessibilidadeUrbanaCreate({
  nome,
  telefone,
  email,
  categoria,
  endereco,
  logo,
  fotos,
  recursos
}: AcessibilidadeUrbanaCreateDTO): Prisma.AcessibilidadeUrbanaCreateInput {
  return {
    nome,
    telefone,
    email,
    categoria,
    endereco: endereco
      ? {
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
        }
      : undefined,
    logo: generateDataLogoAcessibilidadeUrbanaCreate(logo),
    fotos:
      fotos && fotos.length > 0
        ? {
            create: fotos.map((foto) => ({ url: foto }))
          }
        : undefined,
    recursos:
      recursos && recursos.length > 0
        ? {
            create: recursos.map((recurso) => ({
              simbolo: recurso.simbolo,
              descricao: recurso.descricao ?? null
            }))
          }
        : undefined
  }
}

/**
 * - Gera dados formatados para atualização de acessibilidade urbana no Prisma
 * - Converte DTO de atualização em input do Prisma, incluindo upsert do endereço, fotos, logo e recursos
 * - Apenas campos definidos são incluídos na atualização
 * @param {AcessibilidadeUrbanaUpdateDTO} data - Dados de atualização vindos do DTO
 * @param {string} acessibilidadeUrbanaId - ID da acessibilidade urbana que está sendo atualizada
 * @returns {Promise<Prisma.AcessibilidadeUrbanaUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataAcessibilidadeUrbanaUpdate(
  {
    nome,
    telefone,
    email,
    categoria,
    endereco,
    logo,
    fotos,
    recursos
  }: AcessibilidadeUrbanaUpdateDTO,
  acessibilidadeUrbanaId: string
): Promise<Prisma.AcessibilidadeUrbanaUpdateInput> {
  const dataToUpdate: Prisma.AcessibilidadeUrbanaUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (telefone !== undefined) {
    dataToUpdate.telefone = telefone
  }
  if (email !== undefined) {
    dataToUpdate.email = email
  }
  if (categoria !== undefined) {
    dataToUpdate.categoria = categoria
  }

  if (logo !== undefined) {
    const logoUpdate = await generateDataLogoAcessibilidadeUrbanaUpdate(
      logo,
      acessibilidadeUrbanaId
    )
    if (logoUpdate) {
      dataToUpdate.logo = logoUpdate
    }
  }

  if (fotos !== undefined) {
    dataToUpdate.fotos = {
      deleteMany: {},
      create: fotos.map((foto) => ({ url: foto }))
    }
  }

  if (recursos !== undefined) {
    dataToUpdate.recursos = {
      deleteMany: {},
      create: recursos.map((recurso) => ({
        simbolo: recurso.simbolo,
        descricao: recurso.descricao ?? null
      }))
    }
  }

  if (endereco) {
    const enderecoUpdate: Prisma.EnderecoUpdateInput = {}
    const enderecoCreate: Prisma.EnderecoCreateWithoutAcessibilidadeUrbanaInput =
      {
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

  return dataToUpdate
}
