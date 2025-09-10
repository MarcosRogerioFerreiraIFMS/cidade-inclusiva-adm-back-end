import { LikeCreateDTO } from '@/dtos/create'
import { createLikeSchema } from '@/schemas'

/**
 * - Converte dados não tipados para DTO de criação de like
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {LikeCreateDTO} DTO validado para criação de like
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateLikeDTO(data: unknown): LikeCreateDTO {
  return createLikeSchema.parse(data)
}
