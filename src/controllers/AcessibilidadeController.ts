import { Request, Response } from 'express'
import z from 'zod'
import { AcessibilidadeService } from '../services/AcessibilidadeService'
import { HttpStatus } from '../utils/HttpStatus'

const acessibilidadeService = new AcessibilidadeService()

export class AcessibilidadeController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      await acessibilidadeService.criarAcessibilidade(req.body)
      res
        .status(HttpStatus.CREATED)
        .json({ mensagem: 'Acessibilidade criada com sucesso!' })
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const erros = error.errors.map((err) => ({
          campo: err.path.join('.'),
          mensagem: err.message
        }))
        res.status(HttpStatus.BAD_REQUEST).json(erros)
      } else if (error instanceof Error) {
        try {
          const erros = JSON.parse(error.message)
          res.status(HttpStatus.BAD_REQUEST).json(erros)
        } catch {
          res.status(HttpStatus.BAD_REQUEST).json({ erro: error.message })
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
      const acessibilidades =
        await acessibilidadeService.listarAcessibilidades()
      res.status(HttpStatus.OK).json(acessibilidades)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao listar acessibilidades.' })
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const acessibilidade =
        await acessibilidadeService.obterAcessibilidadePorId(id)

      if (!acessibilidade) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Acessibilidade não encontrada.' })
        return
      }

      res.status(HttpStatus.OK).json(acessibilidade)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao obter acessibilidade.' })
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const acessibilidade =
        await acessibilidadeService.obterAcessibilidadePorId(id)
      if (!acessibilidade) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Acessibilidade não encontrada.' })
        return
      }

      if (!req.body) {
        res
          .status(HttpStatus.OK)
          .json({ mensagem: 'Nenhum dado para atualizar' })
        return
      }

      await acessibilidadeService.atualizarAcessibilidade(id, req.body)
      res
        .status(HttpStatus.OK)
        .json({ mensagem: 'Acessibilidade atualizada com sucesso!' })
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        if (error instanceof Error) {
          try {
            const parsedMessage = JSON.parse(error.message)
            res.status(HttpStatus.BAD_REQUEST).json(parsedMessage)
          } catch {
            console.error(
              'Erro ao fazer parse da mensagem de erro:',
              error.message
            )
            res.status(HttpStatus.BAD_REQUEST).json({
              erro: 'Erro ao atualizar acessibilidade.'
            })
          }
        } else {
          res.status(HttpStatus.BAD_REQUEST).json({
            erro: 'Erro ao atualizar acessibilidade.'
          })
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          erro: 'Erro ao atualizar acessibilidade.'
        })
      }
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const acessibilidade =
        await acessibilidadeService.obterAcessibilidadePorId(id)
      if (!acessibilidade) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Acessibilidade não encontrada.' })
        return
      }

      await acessibilidadeService.deletarAcessibilidade(id)
      res.status(HttpStatus.NO_CONTENT).send()
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao deletar acessibilidade.' })
    }
  }
}
