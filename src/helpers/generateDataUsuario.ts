import { Prisma } from '@prisma/client'
import { UsuarioCreateDTO } from '../dtos/create/UsuarioCreateDTO'
import { UsuarioUpdateDTO } from '../dtos/update/UsuarioUpdateDTO'
import { hashPassword } from '../utils/passwordUtils'

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
    foto: foto ?? null,
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

export async function generateDataUsuarioUpdate({
  nome,
  telefone,
  foto,
  email,
  senha,
  endereco
}: UsuarioUpdateDTO): Promise<Prisma.UsuarioUpdateInput> {
  const dataToUpdate: Prisma.UsuarioUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (telefone !== undefined) {
    dataToUpdate.telefone = telefone
  }
  if (foto !== undefined) {
    dataToUpdate.foto = foto
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
