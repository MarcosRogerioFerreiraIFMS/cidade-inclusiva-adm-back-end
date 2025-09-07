import { z } from 'zod'
import { createVeiculoSchema } from '../../schemas/VeiculoSchema'

/**
 * - DTO (Data Transfer Object) para criação de veículo
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar um novo veículo
 */
export type VeiculoCreateDTO = z.infer<typeof createVeiculoSchema>
