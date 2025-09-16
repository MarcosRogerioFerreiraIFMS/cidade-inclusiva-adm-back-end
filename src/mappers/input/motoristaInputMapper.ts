import type { MotoristaCreateDTO } from '@/dtos/create'
import type { MotoristaUpdateDTO } from '@/dtos/update'
import { createMotoristaSchema, updateMotoristaSchema } from '@/schemas'

/**
 * - Converte dados não tipados para DTO de criação de motorista
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<MotoristaCreateDTO>} DTO validado para criação de motorista
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toCreateMotoristaDTO(
  input: unknown
): Promise<MotoristaCreateDTO> {
  return await createMotoristaSchema.parseAsync(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de motorista
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<MotoristaUpdateDTO>} DTO validado para atualização de motorista
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toUpdateMotoristaDTO(
  input: unknown
): Promise<MotoristaUpdateDTO> {
  return await updateMotoristaSchema.parseAsync(input)
}
