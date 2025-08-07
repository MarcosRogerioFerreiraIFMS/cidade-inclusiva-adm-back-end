import * as net from 'net'
import app from './app'

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
  const isPortAvailable = await checkPortAvailability(Number(PORT))

  if (!isPortAvailable) {
    console.error(`❌ Erro: A porta ${PORT} já está em uso!`)
    console.log(
      '💡 Tente usar uma porta diferente definindo a variável PORT no ambiente'
    )
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor rodando na porta ${PORT}. Acesse em http://localhost:${PORT}`
    )
  })
}

startServer().catch((error) => {
  console.error('❌ Erro ao iniciar o servidor:', error)
  process.exit(1)
})
