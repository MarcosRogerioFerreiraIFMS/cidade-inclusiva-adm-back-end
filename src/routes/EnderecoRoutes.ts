import { Router } from 'express'
import { EnderecoController } from '../controllers/EnderecoController'

const router = Router()
const controller = new EnderecoController()

router.post('/', controller.criar)
router.get('/', controller.listarTodos)
router.get('/:id', controller.obterPorId)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

export default router
