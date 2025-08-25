import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { ROUTES } from './configs/routePaths'
import { HttpStatusCode } from './enums/HttpStatusCode'
import { globalErrorHandler } from './middlewares/errorMiddleware'
import { requestTimeout } from './middlewares/timeoutMiddleware'
import { ComentarioRoutes } from './routes/ComentarioRoutes'
import { LikeRoutes } from './routes/LikeRoutes'
import { NoticiaRoutes } from './routes/NoticiaRoutes'
import { ProfissionalRoutes } from './routes/ProfissionalRoutes'
import { UsuarioRoutes } from './routes/UsuarioRoutes'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: 'Muitas requisições, tente novamente mais tarde.'
  }
})

app.use(limiter)
app.use(requestTimeout(30000))
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)
app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(
  compression({
    level: 6,
    threshold: 1024 * 100
  })
)

app.use(ROUTES.NOTICIA, NoticiaRoutes)
app.use(ROUTES.PROFISSIONAL, ProfissionalRoutes)
app.use(ROUTES.COMENTARIO, ComentarioRoutes)
app.use(ROUTES.USUARIO, UsuarioRoutes)
app.use(ROUTES.LIKE, LikeRoutes)

app.use((_req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Rota não encontrada.' })
})

app.use(globalErrorHandler)

export default app
