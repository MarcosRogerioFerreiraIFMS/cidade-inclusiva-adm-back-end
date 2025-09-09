import { NoticiaCreateDTO } from '../../dtos/create'
import { NoticiaUpdateDTO } from '../../dtos/update'
import { createNoticiaSchema, updateNoticiaSchema } from '../../schemas'

/**
 * - Converte dados não tipados para DTO de criação de notícia
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<NoticiaCreateDTO>} DTO validado para criação de notícia
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateNoticiaDTO(input: unknown): Promise<NoticiaCreateDTO> {
  return createNoticiaSchema.parseAsync(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de notícia
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<NoticiaUpdateDTO>} DTO validado para atualização de notícia
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateNoticiaDTO(input: unknown): Promise<NoticiaUpdateDTO> {
  return updateNoticiaSchema.parseAsync(input)
}
