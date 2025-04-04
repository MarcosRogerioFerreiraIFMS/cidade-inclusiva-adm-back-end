import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import NoticiaRoutes from './routes/NoticiaRoutes'

const app = express()
const port = process.env.PORT || 5555

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/noticias', NoticiaRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(
    `🚀 Servidor rodando na porta ${port}. Acesse em http://localhost:${port}`
  )
})
