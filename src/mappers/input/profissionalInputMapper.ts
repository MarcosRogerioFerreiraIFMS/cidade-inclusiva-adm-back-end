import { ProfissionalCreateDTO } from '../../dtos/create/ProfissionalCreateDTO'
import { ProfissionalUpdateDTO } from '../../dtos/update/ProfissionalUpdateDTO'
import {
  createProfissionalSchema,
  updateProfissionalSchema
} from '../../schemas/ProfissionalSchema'

/**
 * - Converte dados não tipados para DTO de criação de profissional
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ProfissionalCreateDTO>} DTO validado para criação de profissional
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateProfissionalDTO(
  input: unknown
): Promise<ProfissionalCreateDTO> {
  return createProfissionalSchema.parseAsync(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de profissional
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ProfissionalUpdateDTO>} DTO validado para atualização de profissional
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateProfissionalDTO(
  input: unknown
): Promise<ProfissionalUpdateDTO> {
  return updateProfissionalSchema.parseAsync(input)
}
