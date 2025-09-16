import { HttpStatusCode } from '@/enums'
import { HttpError } from '@/utils'
import chalk from 'chalk'
import type { NextFunction, Request, Response } from 'express'

/**
 * - Middleware para controle de timeout de requisições
 * - Interrompe requisições que demoram mais que o tempo limite especificado
 * @param {number} timeoutMs - Tempo limite em milissegundos (padrão: 30000)
 */
export const requestTimeout = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now()

    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        const elapsedTime = Date.now() - startTime
        // Log apenas em produção ou quando NODE_ENV não está definido
        if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
          console.error(
            chalk.red.bold('⏱️  TIMEOUT:'),
            chalk.yellow(`${req.method} ${req.path}`),
            chalk.red(`após ${elapsedTime}ms`)
          )
        }

        const error = new HttpError(
          `Tempo limite da requisição excedido (${timeoutMs}ms). A operação demorou muito para ser concluída. Tente novamente ou entre em contato com o suporte se o problema persistir.`,
          HttpStatusCode.REQUEST_TIMEOUT
        )
        next(error)
      }
    }, timeoutMs)

    // Limpar timeout quando a resposta for finalizada
    res.on('finish', () => {
      clearTimeout(timeout)
    })

    // Limpar timeout quando a conexão for fechada
    res.on('close', () => {
      clearTimeout(timeout)
    })

    // Limpar timeout em caso de erro
    res.on('error', () => {
      clearTimeout(timeout)
    })

    // Adicionar header informativo sobre o timeout
    res.setHeader('X-Request-Timeout', timeoutMs.toString())

    next()
  }
}
