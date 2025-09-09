import { ComentarioCreateDTO } from '../../dtos/create'
import { ComentarioUpdateDTO } from '../../dtos/update'
import { createComentarioSchema, updateComentarioSchema } from '../../schemas'

/**
 * - Converte dados não tipados para DTO de criação de comentário
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body), incluindo o ID do usuário autenticado
 * @returns {ComentarioCreateDTO} DTO validado para criação de comentário
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateComentarioDTO(
  input: unknown & { usuarioId: string }
): ComentarioCreateDTO {
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
