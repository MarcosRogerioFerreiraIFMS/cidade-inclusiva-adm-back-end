import chalk from 'chalk'
import * as net from 'net'
import app from './app'
import { EnvValidator } from './utils/envValidator'

const PORT = Number(process.env.PORT) || 5555

function checkPortAvailability(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer()

    server.listen(port, () => {
      server.once('close', () => {
        resolve(true)
      })
      server.close()
    })

    server.on('error', () => {
      resolve(false)
    })
  })
}

async function startServer() {
  // Valida variáveis de ambiente antes de iniciar o servidor
  console.log(chalk.blue.bold('🔧 Iniciando aplicação Cidade Inclusiva...\n'))

  const isEnvValid = EnvValidator.validateAndLog()
  if (!isEnvValid) {
    console.log(
      chalk.red.bold(
        '💥 Não é possível iniciar a aplicação com variáveis de ambiente inválidas!'
      )
    )
    process.exit(1)
  }

  const isPortAvailable = await checkPortAvailability(PORT)

  if (!isPortAvailable) {
    console.error(chalk.red.bold(`❌ Erro: A porta ${PORT} já está em uso!`))
    console.log(
      chalk.blue('💡 Dica: ') +
        chalk.gray('Defina outra porta usando a variável ') +
        chalk.cyan.bold('PORT') +
        chalk.gray(', por exemplo: ') +
        chalk.green('PORT=3001 pnpm dev')
    )
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(
      chalk.green(`🚀 Servidor rodando na porta ${PORT}.`) +
        ' ' +
        chalk.gray(`Acesse em `) +
        chalk.underline.blue(`http://localhost:${PORT}`)
    )
  })
}

startServer().catch((error) => {
  console.error(chalk.red.bold('❌ Erro ao iniciar o servidor:'))
  console.error(chalk.red(error))
  process.exit(1)
})
