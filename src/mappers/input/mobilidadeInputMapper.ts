import type { MobilidadeCreateDTO } from '@/dtos/create'
import type { MobilidadeUpdateDTO } from '@/dtos/update'
import type { MobilidadeStatus } from '@/enums'
import {
  createMobilidadeSchema,
  mobilidadeStatusSchema,
  updateMobilidadeSchema
} from '@/schemas'

/**
 * - Converte dados não tipados para DTO de criação de mobilidade
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {MobilidadeCreateDTO} DTO validado para criação de mobilidade
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateMobilidadeDTO(input: unknown): MobilidadeCreateDTO {
  return createMobilidadeSchema.parse(input)
}

/**
 * - Converte dados não tipados para DTO de atualização de mobilidade
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {MobilidadeUpdateDTO} DTO validado para atualização de mobilidade
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toUpdateMobilidadeDTO(input: unknown): MobilidadeUpdateDTO {
  return updateMobilidadeSchema.parse(input)
}

/**
 * - Valida e tipa o status de mobilidade
 * @param {unknown} input - Dados de entrada não tipados (geralmente req.body)
 * @returns {MobilidadeStatus} Objeto validado contendo o status
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateMobilidadeStatusDTO(input: unknown): MobilidadeStatus {
  return mobilidadeStatusSchema.parse(input)
}
