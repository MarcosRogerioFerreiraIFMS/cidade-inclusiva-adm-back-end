import { Acessibilidade, Endereco, PrismaClient } from '@prisma/client'
import {
  acessibilidadeSchema,
  acessibilidadeUpdateSchema
} from '../schemas/AcessibilidadeSchema'
import { EnderecoService } from './EnderecoService'

const prisma = new PrismaClient()

export class AcessibilidadeService {
  async criarAcessibilidade(
    dados: Omit<Acessibilidade, 'id' | 'enderecoId'> & {
      categoria: string
      endereco: Omit<Endereco, 'id'>
    }
  ): Promise<void> {
    try {
      const validacao = acessibilidadeSchema.safeParse(dados)
      if (!validacao.success) {
        const erros = validacao.error.errors.map((erro) => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
        throw new Error(
          JSON.stringify({ mensagem: 'Erro de validação', erros })
        )
      }

      if (!dados.endereco) {
        throw new Error('Endereço não fornecido.')
      }

      const enderecoService = new EnderecoService()
      const endereco = await enderecoService.criarEndereco(dados.endereco)

      let categoria = await prisma.categoriaAcessibilidade.findUnique({
        where: { nome: dados.categoria }
      })

      if (!categoria) {
        categoria = await prisma.categoriaAcessibilidade.create({
          data: { nome: dados.categoria }
        })
      }

      await prisma.acessibilidade.create({
        data: {
          nome: dados.nome,
          foto: dados.foto || null,
          telefone: dados.telefone || null,
          email: dados.email || null,
          enderecoId: endereco.id,
          categoriaId: categoria.id
        }
      })
    } catch (error: unknown) {
      console.error('Erro ao criar acessibilidade:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao criar acessibilidade no banco de dados.'
      )
    }
  }

  async listarAcessibilidades(): Promise<Acessibilidade[]> {
    try {
      return await prisma.acessibilidade.findMany({
        include: { categoria: true, endereco: true }
      })
    } catch (error: unknown) {
      console.error('Erro ao listar acessibilidades:', error)
      throw new Error('Erro ao listar acessibilidades do banco de dados.')
    }
  }

  async obterAcessibilidadePorId(id: string): Promise<Acessibilidade | null> {
    try {
      return await prisma.acessibilidade.findUnique({
        where: { id },
        include: { categoria: true, endereco: true }
      })
    } catch (error: unknown) {
      console.error('Erro ao obter acessibilidade por ID:', error)
      throw new Error('Erro ao obter acessibilidade do banco de dados.')
    }
  }

  async atualizarAcessibilidade(
    id: string,
    dados: Partial<Omit<Acessibilidade, 'id'>> & {
      categoria?: string
      endereco?: Partial<Omit<Endereco, 'id'>>
    }
  ): Promise<Acessibilidade> {
    try {
      const validacao = acessibilidadeUpdateSchema.safeParse(dados)
      if (!validacao.success) {
        throw new Error(
          validacao.error.errors.map((err) => err.message).join(', ')
        )
      }

      let categoria
      if (dados.categoria) {
        categoria = await prisma.categoriaAcessibilidade.findUnique({
          where: { nome: dados.categoria }
        })

        if (!categoria) {
          categoria = await prisma.categoriaAcessibilidade.create({
            data: { nome: dados.categoria }
          })
        }
      }

      if (dados.endereco) {
        const acessibilidade = await this.obterAcessibilidadePorId(id)
        if (!acessibilidade) {
          throw new Error('Acessibilidade não encontrada.')
        }
        const enderecoService = new EnderecoService()
        await enderecoService.atualizarEndereco(
          acessibilidade.enderecoId,
          dados.endereco
        )
      }

      return await prisma.acessibilidade.update({
        where: { id },
        data: {
          nome: dados.nome,
          foto: dados.foto !== undefined ? dados.foto : '',
          telefone: dados.telefone !== undefined ? dados.telefone : '',
          email: dados.email !== undefined ? dados.email : '',
          categoriaId: categoria?.id
        }
      })
    } catch (error: unknown) {
      console.error('Erro ao atualizar acessibilidade:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar acessibilidade no banco de dados.'
      )
    }
  }

  async deletarAcessibilidade(id: string): Promise<Acessibilidade> {
    try {
      return await prisma.acessibilidade.delete({ where: { id } })
    } catch (error: unknown) {
      console.error('Erro ao deletar acessibilidade:', error)
      throw new Error('Erro ao deletar acessibilidade do banco de dados.')
    }
  }
}
