import { Request, Response } from 'express'
import { TransporteService } from '../services/TransporteService'
import { HttpStatus } from '../utils/HttpStatus'

const transporteService = new TransporteService()

export class TransporteController {
  async criarMotorista(req: Request, res: Response): Promise<void> {
    try {
      await transporteService.criarMotorista(req.body)
      res.status(HttpStatus.CREATED).json({
        mensagem: 'Motorista criado com sucesso!'
      })
    } catch (error) {
      if (error instanceof Error) {
        try {
          const erros = JSON.parse(error.message)
          res.status(HttpStatus.BAD_REQUEST).json(erros)
        } catch {
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
                  erro: 'Erro ao criar motorista.'
                })
              }
            } else {
              res.status(HttpStatus.BAD_REQUEST).json({
                erro: 'Erro ao criar motorista.'
              })
            }
          } else {
            res.status(HttpStatus.BAD_REQUEST).json({
              erro: 'Erro ao criar motorista.'
            })
          }
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ erro: 'Erro interno do servidor' })
      }
    }
  }

  async listarMotoristas(req: Request, res: Response): Promise<void> {
    try {
      const motoristas = await transporteService.listarMotoristas()
      res.status(HttpStatus.OK).json(motoristas)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao listar motoristas.' })
    }
  }

  async obterMotoristaPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const motorista = await transporteService.obterMotoristaPorId(id)
      if (!motorista) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Motorista não encontrado.' })
        return
      }

      res.status(HttpStatus.OK).json(motorista)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao obter motorista.' })
    }
  }

  async atualizarMotorista(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const motorista = await transporteService.obterMotoristaPorId(id)
      if (!motorista) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Motorista não encontrado.' })
        return
      }

      if (!req.body) {
        res
          .status(HttpStatus.OK)
          .json({ mensagem: 'Nenhum dado para atualizar' })
        return
      }

      await transporteService.atualizarMotorista(id, req.body)
      res.status(HttpStatus.OK).json({
        mensagem: 'Motorista atualizado com sucesso!'
      })
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        erro:
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar motorista.'
      })
    }
  }

  async deletarMotorista(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const motorista = await transporteService.obterMotoristaPorId(id)
      if (!motorista) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Motorista não encontrado.' })
        return
      }

      await transporteService.deletarMotorista(id)
      res.status(HttpStatus.NO_CONTENT).send()
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao deletar motorista.' })
    }
  }

  async criarVeiculo(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.motoristaId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ erro: 'ID do motorista é obrigatório.' })
        return
      }

      const motorista = await transporteService.obterMotoristaPorId(
        req.body.motoristaId
      )
      if (!motorista) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Motorista não encontrado.' })
        return
      }

      await transporteService.criarVeiculo(req.body)
      res.status(HttpStatus.CREATED).json({
        mensagem: 'Veículo criado com sucesso!'
      })
    } catch (error) {
      if (error instanceof Error) {
        try {
          const erros = JSON.parse(error.message)
          res.status(HttpStatus.BAD_REQUEST).json(erros)
        } catch {
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
                  erro: 'Erro ao criar veículo.'
                })
              }
            } else {
              res.status(HttpStatus.BAD_REQUEST).json({
                erro: 'Erro ao criar veículo.'
              })
            }
          } else {
            res.status(HttpStatus.BAD_REQUEST).json({
              erro: 'Erro ao criar veículo.'
            })
          }
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ erro: 'Erro interno do servidor' })
      }
    }
  }

  async listarVeiculos(req: Request, res: Response): Promise<void> {
    try {
      const veiculos = await transporteService.listarVeiculos()
      res.status(HttpStatus.OK).json(veiculos)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao listar veículos.' })
    }
  }

  async obterVeiculoPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const veiculo = await transporteService.obterVeiculoPorId(id)
      if (!veiculo) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Veículo não encontrado.' })
        return
      }

      res.status(HttpStatus.OK).json(veiculo)
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao obter veículo.' })
    }
  }

  async atualizarVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const veiculo = await transporteService.obterVeiculoPorId(id)
      if (!veiculo) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Veículo não encontrado.' })
        return
      }

      if (!req.body) {
        res
          .status(HttpStatus.OK)
          .json({ mensagem: 'Nenhum dado para atualizar' })
        return
      }

      await transporteService.atualizarVeiculo(id, req.body)
      res.status(HttpStatus.OK).json({
        mensagem: 'Veículo atualizado com sucesso!'
      })
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        erro:
          error instanceof Error ? error.message : 'Erro ao atualizar veículo.'
      })
    }
  }

  async deletarVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const veiculo = await transporteService.obterVeiculoPorId(id)
      if (!veiculo) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ erro: 'Veículo não encontrado.' })
        return
      }

      await transporteService.deletarVeiculo(id)
      res.status(HttpStatus.NO_CONTENT).send()
    } catch {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ erro: 'Erro ao deletar veículo.' })
    }
  }
}
