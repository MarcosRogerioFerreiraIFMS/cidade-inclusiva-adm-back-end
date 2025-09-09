import { ManutencaoCreateDTO } from '../../dtos/create'
import { ManutencaoUpdateDTO } from '../../dtos/update'
import { createManutencaoSchema, updateManutencaoSchema } from '../../schemas'

/**
 * - Converte dados não tipados para DTO de criação de manutenção
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ManutencaoCreateDTO>} DTO validado para criação de manutenção
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateManutencaoDTO(
  data: unknown
): Promise<ManutencaoCreateDTO> {
  return createManutencaoSchema.parseAsync(data)
}

/**
 * - Converte dados não tipados para DTO de atualização de manutenção
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<ManutencaoUpdateDTO>} DTO validado para atualização de manutenção
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateManutencaoDTO(
  data: unknown
): Promise<ManutencaoUpdateDTO> {
  return updateManutencaoSchema.parseAsync(data)
}
