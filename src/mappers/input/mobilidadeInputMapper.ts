import { MobilidadeCreateDTO } from '../../dtos/create/MobilidadeCreateDTO'
import { MobilidadeUpdateDTO } from '../../dtos/update/MobilidadeUpdateDTO'
import {
  createMobilidadeSchema,
  updateMobilidadeSchema
} from '../../schemas/MobilidadeSchema'

/**
 * - Converte dados não tipados para DTO de criação de mobilidade
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<MobilidadeCreateDTO>} DTO validado para criação de mobilidade
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateMobilidadeDTO(
  input: unknown
): Promise<MobilidadeCreateDTO> {
  return createMobilidadeSchema.parseAsync(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de mobilidade
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<MobilidadeUpdateDTO>} DTO validado para atualização de mobilidade
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateMobilidadeDTO(
  input: unknown
): Promise<MobilidadeUpdateDTO> {
  return updateMobilidadeSchema.parseAsync(input)
}
