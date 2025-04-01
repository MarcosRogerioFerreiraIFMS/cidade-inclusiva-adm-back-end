import { Noticia } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'
import { NoticiaService } from '../services/NoticiaService'
import { HttpStatus } from '../utils/HttpStatus'

const noticiaService = new NoticiaService()

export class NoticiaController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      await noticiaService.criarNoticia(req.body)
      res.status(HttpStatus.CREATED).json({
        mensagem: 'Notícia criada com sucesso!'
      })
    } catch (erro: unknown) {
      if (erro instanceof z.ZodError) {
        const erros = erro.errors.map((err) => ({
          campo: err.path.join('.'),
          mensagem: err.message
        }))
        res.status(HttpStatus.BAD_REQUEST).json(erros)
      } else if (erro instanceof Error) {
        try {
          const erros = JSON.parse(erro.message)
          res.status(HttpStatus.BAD_REQUEST).json(erros)
        } catch {
          res.status(HttpStatus.BAD_REQUEST).json({ erro: erro.message })
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ erro: 'Erro interno do servidor' })
      }
    }
  }

  async listarTodas(req: Request, res: Response): Promise<void> {
    try {
      const noticias = await noticiaService.listarNoticias()
      res.status(HttpStatus.OK).json(noticias)
    } catch (erro: unknown) {
      console.error('Erro ao listar notícias:', erro)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao listar notícias' })
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const noticia: Noticia | null = await noticiaService.obterNoticiaPorId(id)

      if (!noticia) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Notícia não encontrada' })
        return
      }

      res.status(HttpStatus.OK).json(noticia)
    } catch (erro: unknown) {
      console.error('Erro ao obter notícia por ID:', erro)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao obter notícia' })
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const noticia = await noticiaService.obterNoticiaPorId(id)
      if (!noticia) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Notícia não encontrada' })
        return
      }

      await noticiaService.atualizarNoticia(id, req.body)
      res
        .status(HttpStatus.OK)
        .json({ mensagem: 'Notícia atualizada com sucesso' })
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ erro: erro.message })
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ erro: 'Erro interno do servidor' })
      }
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const noticia = await noticiaService.obterNoticiaPorId(id)
      if (!noticia) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Notícia não encontrada' })
        return
      }

      await noticiaService.deletarNoticia(id)
      res.status(HttpStatus.NO_CONTENT).send()
    } catch (erro: unknown) {
      console.error('Erro ao deletar notícia:', erro)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao deletar a notícia' })
    }
  }
}
