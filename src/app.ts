import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import { HttpStatus } from './enums/HttpStatus'
import { globalErrorHandler } from './middlewares/errorMiddleware'
import { requestTimeout } from './middlewares/timeoutMiddleware'
import { NoticiaRoutes } from './routes/NoticiaRoutes'

const app = express()

app.use(requestTimeout(30000))
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/noticias', NoticiaRoutes)

app.use((_req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).json({ error: 'Rota não encontradaa.' })
})

app.use(globalErrorHandler)

export default app
