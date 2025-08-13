import { NextFunction, Request, Response } from 'express'
import { IProfissionalService } from '../interfaces/services/IProfissionalService'
import { HandleSuccess } from '../utils/HandleSuccess'

export class ProfissionalController {
  constructor(private profissionalService: IProfissionalService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const profissional = await this.profissionalService.create(req.body)
      HandleSuccess.created(
        res,
        profissional,
        'Profissional criado com sucesso'
      )
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
      const profissional = await this.profissionalService.findById(id)
      HandleSuccess.found(res, profissional)
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
      const profissional = await this.profissionalService.update(id, req.body)
      HandleSuccess.updated(
        res,
        profissional,
        'Profissional atualizado com sucesso'
      )
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
      await this.profissionalService.delete(id)
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
      const profissionais = await this.profissionalService.findAll()
      HandleSuccess.list(res, profissionais)
    } catch (error: unknown) {
      next(error)
    }
  }
}
