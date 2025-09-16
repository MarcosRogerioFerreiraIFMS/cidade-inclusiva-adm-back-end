import type { AcessibilidadeUrbanaCreateDTO } from '@/dtos/create'
import type { AcessibilidadeUrbanaUpdateDTO } from '@/dtos/update'
import {
  createAcessibilidadeUrbanaSchema,
  updateAcessibilidadeUrbanaSchema
} from '@/schemas'

/**
 * Converte e valida dados de entrada para criação de acessibilidade urbana
 * @param {unknown} data - Dados de entrada do usuário
 * @returns {Promise<AcessibilidadeUrbanaCreateDTO>} Dados validados e transformados
 * @throws {ZodError} Se os dados não passarem na validação
 */
export async function toCreateAcessibilidadeUrbanaDTO(
  data: unknown
): Promise<AcessibilidadeUrbanaCreateDTO> {
  return await createAcessibilidadeUrbanaSchema.parseAsync(data)
}

/**
 * Converte e valida dados de entrada para atualização de acessibilidade urbana
 * @param {unknown} data - Dados de entrada do usuário
 * @returns {Promise<AcessibilidadeUrbanaUpdateDTO>} Dados validados e transformados
 * @throws {ZodError} Se os dados não passarem na validação
 */
export async function toUpdateAcessibilidadeUrbanaDTO(
  data: unknown
): Promise<AcessibilidadeUrbanaUpdateDTO> {
  return await updateAcessibilidadeUrbanaSchema.parseAsync(data)
}

export function toCreateCategoriaAcessibilidadeUrbanaDTO(
  data: unknown
): string {
  const parsed = createAcessibilidadeUrbanaSchema.shape.categoria.parse(data)
  return parsed
}
