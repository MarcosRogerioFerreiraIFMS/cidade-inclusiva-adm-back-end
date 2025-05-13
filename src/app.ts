import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import AcessibilidadeRoutes from './routes/AcessibilidadeRoutes'
import EnderecoRoutes from './routes/EnderecoRoutes'
import NoticiaRoutes from './routes/NoticiaRoutes'
import TransporteRoutes from './routes/TransporteRoutes'

const app = express()
const port = process.env.PORT || 5555

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/noticias', NoticiaRoutes)
app.use('/acessibilidades', AcessibilidadeRoutes)
app.use('/enderecos', EnderecoRoutes)
app.use('/', TransporteRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(
    `🚀 Servidor rodando na porta ${port}. Acesse em http://localhost:${port}`
  )
})
