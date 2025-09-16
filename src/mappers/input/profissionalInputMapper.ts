import type { ProfissionalCreateDTO } from '@/dtos/create'
import type { ProfissionalUpdateDTO } from '@/dtos/update'
import { createProfissionalSchema, updateProfissionalSchema } from '@/schemas'

/**
 * - Converte dados não tipados para DTO de criação de profissional
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ProfissionalCreateDTO>} DTO validado para criação de profissional
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toCreateProfissionalDTO(
  input: unknown
): Promise<ProfissionalCreateDTO> {
  return await createProfissionalSchema.parseAsync(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de profissional
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ProfissionalUpdateDTO>} DTO validado para atualização de profissional
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toUpdateProfissionalDTO(
  input: unknown
): Promise<ProfissionalUpdateDTO> {
  return await updateProfissionalSchema.parseAsync(input)
}
