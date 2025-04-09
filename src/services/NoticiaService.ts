import { Noticia, PrismaClient } from '@prisma/client'
import { noticiaSchema, noticiaUpdateSchema } from '../schemas/NoticiaSchema'
import { NoticiaListar } from '../types/NoticiaTypes'

const prisma = new PrismaClient()

export class NoticiaService {
  async criarNoticia(
    dados: Omit<Noticia, 'id' | 'data' | 'dataPublicacao'> & {
      categoria: string
      dataPublicacao?: string
    }
  ): Promise<void> {
    try {
      const validacao = noticiaSchema.safeParse(dados)
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

      let categoria = await prisma.categoriaNoticia.findUnique({
        where: { nome: dados.categoria }
      })

      if (!categoria) {
        categoria = await prisma.categoriaNoticia.create({
          data: { nome: dados.categoria }
        })
      }

      const dataPublicacao = dados.dataPublicacao
        ? new Date(dados.dataPublicacao)
        : new Date()

      await prisma.noticia.create({
        data: {
          titulo: dados.titulo,
          conteudo: dados.conteudo,
          url: dados.url || '',
          foto: dados.foto || '',
          categoriaId: categoria.id,
          dataPublicacao
        }
      })
    } catch (error: unknown) {
      console.error('Erro ao criar notícia:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Erro ao criar notícia no banco de dados.'
      )
    }
  }

  async listarNoticias(): Promise<NoticiaListar[]> {
    try {
      const noticias = await prisma.noticia.findMany({
        include: { categoria: true }
      })

      if (!noticias || noticias.length === 0) {
        return []
      }

      const noticiasMapeadas = noticias.map((noticia) => ({
        id: noticia.id,
        titulo: noticia.titulo,
        conteudo: noticia.conteudo,
        url: noticia.url,
        foto: noticia.foto,
        dataPublicacao: noticia.dataPublicacao.toISOString(),
        categoria: noticia.categoria.nome
      }))

      return noticiasMapeadas
    } catch (error: unknown) {
      console.error('Erro ao listar notícias:', error)
      throw new Error('Erro ao listar notícias do banco de dados.')
    }
  }

  async obterNoticiaPorId(id: string): Promise<NoticiaListar | null> {
    try {
      const noticia = await prisma.noticia.findUnique({
        where: { id },
        include: { categoria: true }
      })

      if (!noticia) {
        return null
      }

      return {
        id: noticia.id,
        titulo: noticia.titulo,
        conteudo: noticia.conteudo,
        url: noticia.url,
        foto: noticia.foto,
        dataPublicacao: noticia.dataPublicacao.toISOString(),
        categoria: noticia.categoria.nome
      }
    } catch (error: unknown) {
      console.error('Erro ao obter notícia por ID:', error)
      throw new Error('Erro ao obter notícia do banco de dados.')
    }
  }

  async atualizarNoticia(
    id: string,
    dados: Partial<
      Omit<Noticia, 'id' | 'data' | 'dataPublicacao'> & {
        categoria?: string
        dataPublicacao?: string
      }
    >
  ): Promise<Noticia> {
    try {
      const validacao = noticiaUpdateSchema.safeParse(dados)
      if (!validacao.success) {
        throw new Error(
          validacao.error.errors.map((err) => err.message).join(', ')
        )
      }

      let categoria
      if (dados.categoria) {
        categoria = await prisma.categoriaNoticia.findUnique({
          where: { nome: dados.categoria }
        })

        if (!categoria) {
          categoria = await prisma.categoriaNoticia.create({
            data: { nome: dados.categoria }
          })
        }
      }

      const dataPublicacao = dados.dataPublicacao
        ? new Date(dados.dataPublicacao)
        : undefined

      return await prisma.noticia.update({
        where: { id },
        data: {
          titulo: dados.titulo,
          conteudo: dados.conteudo,
          url: dados.url,
          foto: dados.foto,
          categoriaId: categoria?.id,
          dataPublicacao
        }
      })
    } catch (error: unknown) {
      console.error('Erro ao atualizar notícia:', error)
      throw new Error('Erro ao atualizar notícia no banco de dados.')
    }
  }

  async deletarNoticia(id: string): Promise<Noticia> {
    try {
      return await prisma.noticia.delete({ where: { id } })
    } catch (error: unknown) {
      console.error('Erro ao deletar notícia:', error)
      throw new Error('Erro ao deletar notícia do banco de dados.')
    }
  }
}
