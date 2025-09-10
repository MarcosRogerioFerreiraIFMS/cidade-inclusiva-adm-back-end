import { createEmailSchema } from '@/schemas'

/**
 * - Converte dados não tipados para email validado
 * - Aplica validação usando Zod schema e retorna email tipado e validado
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {string} Email validado
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateEmailDTO(data: unknown): string {
  return createEmailSchema.parse(data)
}
