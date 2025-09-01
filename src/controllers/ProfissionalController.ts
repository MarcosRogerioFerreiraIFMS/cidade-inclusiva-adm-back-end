import { IProfissionalService } from '../interfaces/services/IProfissionalService'
import { ControllerRequest } from '../types/RequestTypes'
import { HandleSuccess } from '../utils/HandleSuccess'

export class ProfissionalController {
  constructor(private profissionalService: IProfissionalService) {}

  create: ControllerRequest = async (req, res, next) => {
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

  findById: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      const profissional = await this.profissionalService.findById(id)
      HandleSuccess.found(res, profissional)
    } catch (error: unknown) {
      next(error)
    }
  }

  update: ControllerRequest = async (req, res, next) => {
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

  delete: ControllerRequest = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.profissionalService.delete(id)
      HandleSuccess.deleted(res)
    } catch (error: unknown) {
      next(error)
    }
  }

  findAll: ControllerRequest = async (_req, res, next) => {
    try {
      const profissionais = await this.profissionalService.findAll()
      HandleSuccess.list(res, profissionais)
    } catch (error: unknown) {
      next(error)
    }
  }
}
