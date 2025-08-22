import { NextFunction, Request, Response } from 'express'
import { IUsuarioService } from '../interfaces/services/IUsuarioService'
import { HandleSuccess } from '../utils/HandleSuccess'

export class UsuarioController {
  constructor(private usuarioService: IUsuarioService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const usuario = await this.usuarioService.create(req.body)
      HandleSuccess.created(res, usuario, 'Usuário criado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const usuario = await this.usuarioService.findById(id)
      HandleSuccess.found(res, usuario)
    } catch (error: unknown) {
      next(error)
    }
  }

  findByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.params
      const usuario = await this.usuarioService.findByEmail(email)
      HandleSuccess.found(res, usuario)
    } catch (error: unknown) {
      next(error)
    }
  }

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const usuario = await this.usuarioService.update(id, req.body)
      HandleSuccess.updated(res, usuario, 'Usuário atualizado com sucesso')
    } catch (error: unknown) {
      next(error)
    }
  }

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      await this.usuarioService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  findAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const usuarios = await this.usuarioService.findAll()
      HandleSuccess.list(res, usuarios)
    } catch (error: unknown) {
      next(error)
    }
  }
}
