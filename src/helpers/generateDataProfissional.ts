import { Prisma } from '@prisma/client'
import { ProfissionalCreateDTO } from '../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../dtos/update/ProfissionalUpdateDTO'

export function generateDataProfissionalCreate({
  nome,
  foto,
  telefone,
  email,
  especialidade
}: ProfissionalCreateDTO): Prisma.ProfissionalCreateInput {
  return {
    nome,
    foto: foto ?? null,
    telefone,
    email,
    especialidade
  }
}

export function generateDataProfissionalUpdate({
  nome,
  foto,
  telefone,
  email,
  especialidade
}: ProfissionalUpdateDTO): Prisma.ProfissionalUpdateInput {
  const dataToUpdate: Prisma.ProfissionalUpdateInput = {}

  if (nome !== undefined) {
    dataToUpdate.nome = nome
  }
  if (foto !== undefined) {
    dataToUpdate.foto = foto
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
