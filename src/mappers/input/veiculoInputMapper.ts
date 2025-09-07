import { VeiculoCreateDTO } from '../../dtos/create/VeiculoCreateDTO'
import { VeiculoUpdateDTO } from '../../dtos/update/VeiculoUpdateDTO'
import {
  createVeiculoSchema,
  updateVeiculoSchema
} from '../../schemas/VeiculoSchema'

/**
 * - Converte dados não tipados para DTO de criação de veículo
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<VeiculoCreateDTO>} DTO validado para criação de veículo
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateVeiculoDTO(input: unknown): Promise<VeiculoCreateDTO> {
  return createVeiculoSchema.parseAsync(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de veículo
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<VeiculoUpdateDTO>} DTO validado para atualização de veículo
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateVeiculoDTO(input: unknown): Promise<VeiculoUpdateDTO> {
  return updateVeiculoSchema.parseAsync(input)
}
