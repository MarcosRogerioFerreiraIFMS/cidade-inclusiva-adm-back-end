import chalk from 'chalk'
import * as net from 'net'
import app from './app'
import { EnvValidator } from './utils/envValidator'

/**
 * Porta do servidor configurada pela variável de ambiente PORT ou 5555 como padrão
 * @constant {number}
 */
const PORT = Number(process.env.PORT) || 5555

/**
 * Verifica se uma porta específica está disponível para uso
 * @param {number} port - Número da porta a ser verificada
 * @returns {Promise<boolean>} Promise que resolve com true se a porta estiver disponível
 */
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

/**
 * Inicializa o servidor da aplicação com validações e verificações necessárias
 * @async
 * @returns {Promise<void>}
 */
async function startServer(): Promise<void> {
  // Valida variáveis de ambiente antes de iniciar o servidor
  console.log(chalk.blue.bold('🔧 Iniciando aplicação Cidade Inclusiva...\n'))

  // Em desenvolvimento, usa logs menos verbosos para evitar spam
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const isEnvValid = EnvValidator.validateAndLog(!isDevelopment)
  if (!isEnvValid) {
    console.log(
      chalk.red.bold(
        '💥 Não é possível iniciar a aplicação com variáveis de ambiente inválidas!'
      )
    )
    console.log()
    console.log(
      chalk.yellow.bold('💡 SOLUÇÃO: ') + chalk.cyan.bold('pnpm validate-env')
    )
    console.log(
      chalk.gray(
        '   ↳ Este comando mostrará instruções detalhadas para configurar todas as variáveis.'
      )
    )
    console.log()
    console.log(chalk.blue('📋 Processo rápido:'))
    console.log(chalk.gray('   1. ') + chalk.cyan('cp .env.example .env'))
    console.log(chalk.gray('   2. ') + chalk.cyan('pnpm generate-jwt-secret'))
    console.log(chalk.gray('   3. Configure as variáveis no arquivo .env'))
    console.log(chalk.gray('   4. ') + chalk.cyan('pnpm dev'))
    console.log()
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
