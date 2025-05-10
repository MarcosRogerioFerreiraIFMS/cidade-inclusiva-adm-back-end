import { Endereco, PrismaClient } from '@prisma/client'
import { enderecoSchema, enderecoUpdateSchema } from '../schemas/EnderecoSchema'

const prisma = new PrismaClient()

export class EnderecoService {
  async criarEndereco(dados: Omit<Endereco, 'id'>): Promise<Endereco> {
    try {
      const validacao = enderecoSchema.safeParse(dados)
      if (!validacao.success) {
        const erros = validacao.error.errors.map((erro) => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
        throw new Error(
          JSON.stringify({ mensagem: 'Erro de validação', erros })
        )
      }

      return await prisma.endereco.create({ data: dados })
    } catch (error: unknown) {
      console.error('Erro ao criar endereço:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao criar endereço no banco de dados.'
      )
    }
  }

  async listarEnderecos(): Promise<Endereco[]> {
    try {
      return await prisma.endereco.findMany()
    } catch (error: unknown) {
      console.error('Erro ao listar endereços:', error)
      throw new Error('Erro ao listar endereços do banco de dados.')
    }
  }

  async obterEnderecoPorId(id: string): Promise<Endereco | null> {
    try {
      return await prisma.endereco.findUnique({ where: { id } })
    } catch (error: unknown) {
      console.error('Erro ao obter endereço por ID:', error)
      throw new Error('Erro ao obter endereço do banco de dados.')
    }
  }

  async atualizarEndereco(
    id: string,
    dados: Partial<Omit<Endereco, 'id'>>
  ): Promise<Endereco> {
    try {
      const validacao = enderecoUpdateSchema.safeParse(dados)
      if (!validacao.success) {
        const erros = validacao.error.errors.map((erro) => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
        throw new Error(
          JSON.stringify({ mensagem: 'Erro de validação', erros })
        )
      }

      return await prisma.endereco.update({ where: { id }, data: dados })
    } catch (error: unknown) {
      console.error('Erro ao atualizar endereço:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar endereço no banco de dados.'
      )
    }
  }

  async deletarEndereco(id: string): Promise<Endereco> {
    try {
      return await prisma.endereco.delete({ where: { id } })
    } catch (error: unknown) {
      console.error('Erro ao deletar endereço:', error)
      throw new Error('Erro ao deletar endereço do banco de dados.')
    }
  }
}
