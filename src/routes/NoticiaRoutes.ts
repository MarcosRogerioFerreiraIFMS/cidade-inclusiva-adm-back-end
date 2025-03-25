import { Router } from 'express'
import { NoticiaController } from '../controllers/NoticiaController'

const router = Router()
const controller = new NoticiaController()

router.post('/', controller.criar)
router.get('/', controller.listarTodas)
router.get('/:id', controller.obterPorId)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

export default router
