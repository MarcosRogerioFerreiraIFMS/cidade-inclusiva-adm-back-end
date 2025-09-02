import { ComentarioCreateDTO } from '../../dtos/create/ComentarioCreateDTO'
import { ComentarioUpdateDTO } from '../../dtos/update/ComentarioUpdateDTO'
import {
  createComentarioSchema,
  updateComentarioSchema
} from '../../schemas/ComentarioSchema'

/**
 * - Converte dados não tipados para DTO de criação de comentário
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {ComentarioCreateDTO} DTO validado para criação de comentário
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateComentarioDTO(input: unknown): ComentarioCreateDTO {
  return createComentarioSchema.parse(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de comentário
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {ComentarioUpdateDTO} DTO validado para atualização de comentário
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateComentarioDTO(input: unknown): ComentarioUpdateDTO {
  return updateComentarioSchema.parse(input)
}
