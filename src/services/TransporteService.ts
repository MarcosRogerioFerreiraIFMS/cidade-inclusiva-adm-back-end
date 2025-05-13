import { Motorista, PrismaClient, Veiculo } from '@prisma/client'
import {
  motoristaSchema,
  motoristaUpdateSchema
} from '../schemas/MotoristaSchema'
import { veiculoSchema, veiculoUpdateSchema } from '../schemas/VeiculoSchema'

const prisma = new PrismaClient()

export class TransporteService {
  async criarMotorista(dados: Omit<Motorista, 'id'>): Promise<void> {
    try {
      if (typeof dados !== 'object' || dados === null) {
        throw new Error('Dados inválidos')
      }

      const validacao = motoristaSchema.safeParse(dados)
      if (!validacao.success) {
        const erros = validacao.error.errors.map((erro) => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
        throw new Error(
          JSON.stringify({
            mensagem: 'Erro de validação',
            erros
          })
        )
      }

      await prisma.motorista.create({ data: dados })
    } catch (error) {
      console.error('Erro ao criar motorista:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao criar motorista no banco de dados.'
      )
    }
  }

  async listarMotoristas(): Promise<Motorista[]> {
    return prisma.motorista.findMany()
  }

  async obterMotoristaPorId(id: string): Promise<Motorista | null> {
    return prisma.motorista.findUnique({ where: { id } })
  }

  async atualizarMotorista(
    id: string,
    dados: Partial<Omit<Motorista, 'id'>>
  ): Promise<Motorista> {
    const validacao = motoristaUpdateSchema.safeParse(dados)
    if (!validacao.success) {
      throw new Error(
        validacao.error.errors.map((err) => err.message).join(', ')
      )
    }

    return prisma.motorista.update({
      where: { id },
      data: {
        ...dados,
        foto: dados.foto !== undefined ? dados.foto : ''
      }
    })
  }

  async deletarMotorista(id: string): Promise<Motorista> {
    return prisma.motorista.delete({ where: { id } })
  }

  async criarVeiculo(dados: Omit<Veiculo, 'id'>): Promise<void> {
    try {
      if (typeof dados !== 'object' || dados === null) {
        throw new Error('Dados inválidos')
      }

      const validacao = veiculoSchema.safeParse(dados)
      if (!validacao.success) {
        const erros = validacao.error.errors.map((erro) => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
        throw new Error(
          JSON.stringify({
            mensagem: 'Erro de validação',
            erros
          })
        )
      }

      await prisma.veiculo.create({ data: dados })
    } catch (error) {
      console.error('Erro ao criar veículo:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao criar veículo no banco de dados.'
      )
    }
  }

  async listarVeiculos(): Promise<Veiculo[]> {
    return prisma.veiculo.findMany()
  }

  async obterVeiculoPorId(id: string): Promise<Veiculo | null> {
    return prisma.veiculo.findUnique({ where: { id } })
  }

  async atualizarVeiculo(
    id: string,
    dados: Partial<Omit<Veiculo, 'id'>>
  ): Promise<Veiculo> {
    const validacao = veiculoUpdateSchema.safeParse(dados)
    if (!validacao.success) {
      throw new Error(
        validacao.error.errors.map((err) => err.message).join(', ')
      )
    }

    return prisma.veiculo.update({ where: { id }, data: dados })
  }

  async deletarVeiculo(id: string): Promise<Veiculo> {
    return prisma.veiculo.delete({ where: { id } })
  }
}
