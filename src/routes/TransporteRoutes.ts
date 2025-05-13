import { Router } from 'express'
import { TransporteController } from '../controllers/TransporteController'

const router = Router()
const controller = new TransporteController()

router.post('/motoristas', controller.criarMotorista)
router.get('/motoristas', controller.listarMotoristas)
router.get('/motoristas/:id', controller.obterMotoristaPorId)
router.put('/motoristas/:id', controller.atualizarMotorista)
router.delete('/motoristas/:id', controller.deletarMotorista)

router.post('/veiculos', controller.criarVeiculo)
router.get('/veiculos', controller.listarVeiculos)
router.get('/veiculos/:id', controller.obterVeiculoPorId)
router.put('/veiculos/:id', controller.atualizarVeiculo)
router.delete('/veiculos/:id', controller.deletarVeiculo)

export default router
