import { Router } from 'express'
import { AcessibilidadeController } from '../controllers/AcessibilidadeController'

const router = Router()
const controller = new AcessibilidadeController()

router.post('/', controller.criar)
router.get('/', controller.listarTodas)
router.get('/:id', controller.obterPorId)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

export default router
