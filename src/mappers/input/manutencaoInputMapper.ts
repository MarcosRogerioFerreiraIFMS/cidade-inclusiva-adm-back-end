import type { ManutencaoCreateDTO } from '@/dtos/create'
import type { ManutencaoUpdateDTO } from '@/dtos/update'
import { ManutencaoEspecialidadeTipo } from '@/enums'
import { createManutencaoSchema, updateManutencaoSchema } from '@/schemas'
import { z } from 'zod'

/**
 * - Converte dados não tipados para DTO de criação de manutenção
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ManutencaoCreateDTO>} DTO validado para criação de manutenção
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toCreateManutencaoDTO(
  data: unknown
): Promise<ManutencaoCreateDTO> {
  return await createManutencaoSchema.parseAsync(data)
}

/**
 * - Converte dados não tipados para DTO de atualização de manutenção
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ManutencaoUpdateDTO>} DTO validado para atualização de manutenção
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toUpdateManutencaoDTO(
  data: unknown
): Promise<ManutencaoUpdateDTO> {
  return await updateManutencaoSchema.parseAsync(data)
}

/**
 * Schema para validar e transformar uma única especialidade
 */
const especialidadeSchema = z
  .string({
    required_error: 'A especialidade é obrigatória.',
    invalid_type_error: 'A especialidade deve ser uma string.'
  })
  .transform((val) => val.trim().toUpperCase())
  .refine(
    (val: string) =>
      Object.values(ManutencaoEspecialidadeTipo).includes(
        val as ManutencaoEspecialidadeTipo
      ),
    {
      message:
        'Especialidade inválida. Valores permitidos: ' +
        Object.values(ManutencaoEspecialidadeTipo).join(', ')
    }
  )

/**
 * - Converte e valida uma especialidade individual
 * @param {unknown} data - String da especialidade não validada
 * @returns {string} Especialidade validada e transformada (enum ManutencaoEspecialidadeTipo)
 * @throws {ZodError} Erro de validação se a especialidade não for válida
 */
export function toCreateEspecialidadeManutencaoDTO(data: unknown): string {
  return especialidadeSchema.parse(data)
}
