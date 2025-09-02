import { LoginCreateDTO } from '../../dtos/create/LoginCreateDTO'
import { createLoginSchema } from '../../schemas/LoginSchema'

/**
 * - Converte dados não tipados em LoginCreateDTO validado
 * @param {unknown} data - Dados de login não tipados vindos da requisição
 * @returns {LoginCreateDTO} DTO validado com dados de login
 * @throws {ZodError} Quando os dados não atendem ao schema de validação
 */
export function toCreateLoginDTO(data: unknown): LoginCreateDTO {
  return createLoginSchema.parse(data)
}
