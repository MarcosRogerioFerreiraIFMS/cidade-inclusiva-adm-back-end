import { Request, Response } from 'express'
import { EnderecoService } from '../services/EnderecoService'
import { HttpStatus } from '../utils/HttpStatus'

const enderecoService = new EnderecoService()

export class EnderecoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const endereco = await enderecoService.criarEndereco(req.body)
      res.status(HttpStatus.CREATED).json(endereco)
    } catch (error: unknown) {
      res.status(HttpStatus.BAD_REQUEST).json({
        erro: error instanceof Error ? error.message : 'Erro ao criar endereço.'
      })
    }
  }

  async listarTodos(req: Request, res: Response): Promise<void> {
    try {
      const enderecos = await enderecoService.listarEnderecos()
      res.status(HttpStatus.OK).json(enderecos)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao listar endereços.' })
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const endereco = await enderecoService.obterEnderecoPorId(id)

      if (!endereco) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Endereço não encontrado.' })
        return
      }

      res.status(HttpStatus.OK).json(endereco)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao obter endereço.' })
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const endereco = await enderecoService.obterEnderecoPorId(id)
      if (!endereco) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Endereço não encontrado.' })
        return
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ mensagem: 'Nenhum dado para atualizar' })
        return
      }

      await enderecoService.atualizarEndereco(id, req.body)

      res.status(HttpStatus.OK).json({
        mensagem: 'Endereço atualizado com sucesso!'
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ erro: error.message })
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

      const endereco = await enderecoService.obterEnderecoPorId(id)
      if (!endereco) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Endereço não encontrado.' })
        return
      }

      await enderecoService.deletarEndereco(id)
      res.status(HttpStatus.NO_CONTENT).send()
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao deletar endereço.' })
    }
  }
}
