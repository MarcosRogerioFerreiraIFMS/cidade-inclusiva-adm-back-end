import express from 'express'
import { NoticiaController } from '../controllers/NoticiaController'

export const routes = express.Router()

routes.get('/noticias', NoticiaController.findAll)
