import { Prisma } from '@prisma/client'
import { db } from '../database/prisma'
import { UsuarioCreateDTO } from '../dtos/create/UsuarioCreateDTO'
import { UsuarioUpdateDTO } from '../dtos/update/UsuarioUpdateDTO'
import { hashPassword } from '../utils/passwordUtils'

/**
 * - Gera dados formatados para criação de usuário no Prisma
 * - Converte DTO de criação em input do Prisma, incluindo hash da senha e criação do endereço
 * @param {UsuarioCreateDTO} data - Dados do usuário vindos do DTO
 * @returns {Promise<Prisma.UsuarioCreateInput>} Dados formatados para o Prisma
 */
export async function generateDataUsuarioCreate({
  nome,
  telefone,
  foto,
  email,
  senha,
  endereco
}: UsuarioCreateDTO): Promise<Prisma.UsuarioCreateInput> {
  const hashedPassword = await hashPassword(senha)

  return {
    nome,
    telefone,
    foto: {
      create: {
        url: foto ?? ''
      }
    },
    email,
    senha: hashedPassword,
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
    }
  }
}

/**
 * - Gera dados formatados para atualização de usuário no Prisma
 * - Converte DTO de atualização em input do Prisma, incluindo upsert do endereço
 * - Apenas campos definidos são incluídos na atualização
 * @param {UsuarioUpdateDTO} data - Dados de atualização vindos do DTO
 * @param {string} usuarioId - ID do usuário que está sendo atualizado
 * @returns {Promise<Prisma.UsuarioUpdateInput>} Dados formatados para o Prisma
 */
export async function generateDataUsuarioUpdate(
  { nome, telefone, foto, email, senha, endereco }: UsuarioUpdateDTO,
  usuarioId: string
): Promise<Prisma.UsuarioUpdateInput> {
  const dataToUpdate: Prisma.UsuarioUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (telefone !== undefined) {
    dataToUpdate.telefone = telefone
  }
  if (foto !== undefined) {
    await db.$transaction(async (tx) => {
      const usuario = await tx.usuario.findUnique({
        where: { id: usuarioId },
        include: { foto: true }
      })

      if (!usuario) {
        throw new Error('Usuário não encontrado')
      }

      // Se não houver foto associada, cria uma nova
      if (!usuario.foto) {
        dataToUpdate.foto = { create: { url: foto } }
      }

      // Se já houver uma foto associada e ela for diferente da nova
      if (usuario.foto && usuario.foto.url !== foto) {
        await tx.foto.delete({ where: { id: usuario.foto.id } })

        // Cria uma nova foto
        dataToUpdate.foto = { create: { url: foto } }
      }
    })
  }
  if (email !== undefined) {
    dataToUpdate.email = email
  }
  if (senha !== undefined) {
    dataToUpdate.senha = await hashPassword(senha)
  }

  if (endereco) {
    const enderecoUpdate: Prisma.EnderecoUpdateInput = {}
    const enderecoCreate: Prisma.EnderecoCreateWithoutUsuarioInput = {
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
