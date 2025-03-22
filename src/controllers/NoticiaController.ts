import { Request, Response } from 'express'
import { db } from '../lib/prisma'

async function findAll(req: Request, res: Response) {
  const noticias = await db.noticia.findMany()
  res.json(noticias)
}

export const NoticiaController = {
  findAll
}
