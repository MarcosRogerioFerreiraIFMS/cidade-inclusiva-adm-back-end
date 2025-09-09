import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import { ROUTES } from './configs/routePaths'
import { HttpStatusCode } from './enums'
import { globalErrorHandler } from './middlewares/errorMiddleware'
import { requestTimeout } from './middlewares/timeoutMiddleware'
import {
  AuthRoutes,
  ComentarioRoutes,
  LikeRoutes,
  ManutencaoRoutes,
  MobilidadeRoutes,
  MotoristaRoutes,
  NoticiaRoutes,
  ProfissionalRoutes,
  UsuarioRoutes,
  VeiculoRoutes
} from './routes'

/**
 * Instância principal da aplicação Express
 */
const app = express()

app.use(requestTimeout(30 * 1000)) // timeout de 30 segundos

/**
 * Configuração do CORS para permitir requisições cross-origin
 */
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)

app.use(helmet()) // Headers de segurança
app.use(express.json({ limit: '1mb' })) // Parser JSON com limite
app.use(express.urlencoded({ extended: true, limit: '1mb' })) // Parser URL encoded

/**
 * Configuração de compressão para otimizar responses
 */
app.use(
  compression({
    level: 6,
    threshold: 1024 * 100 // comprimir apenas responses > 100KB
  })
)

// Rotas da aplicação
app.use(ROUTES.AUTH, AuthRoutes)
app.use(ROUTES.NOTICIA, NoticiaRoutes)
app.use(ROUTES.PROFISSIONAL, ProfissionalRoutes)
app.use(ROUTES.COMENTARIO, ComentarioRoutes)
app.use(ROUTES.USUARIO, UsuarioRoutes)
app.use(ROUTES.LIKE, LikeRoutes)
app.use(ROUTES.MOBILIDADE, MobilidadeRoutes)
app.use(ROUTES.MOTORISTA, MotoristaRoutes)
app.use(ROUTES.VEICULO, VeiculoRoutes)
app.use(ROUTES.MANUTENCAO, ManutencaoRoutes)

/**
 * Handler para rotas não encontradas
 */
app.use((_req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Rota não encontrada.' })
})

// Middleware global de tratamento de erros
app.use(globalErrorHandler)

export default app
