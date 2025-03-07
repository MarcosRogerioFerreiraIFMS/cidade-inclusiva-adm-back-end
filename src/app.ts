import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 5555

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(
    `🚀 Servidor rodando na porta ${port}. Acesse em http://localhost:${port}`
  )
})
