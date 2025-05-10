import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import acessibilidadeRoutes from './routes/AcessibilidadeRoutes'
import enderecoRoutes from './routes/EnderecoRoutes'
import NoticiaRoutes from './routes/NoticiaRoutes'

const app = express()
const port = process.env.PORT || 5555

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/noticias', NoticiaRoutes)
app.use('/acessibilidades', acessibilidadeRoutes)
app.use('/enderecos', enderecoRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(
    `🚀 Servidor rodando na porta ${port}. Acesse em http://localhost:${port}`
  )
})
