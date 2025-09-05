import { MobilidadeCreateDTO } from '../../dtos/create/MobilidadeCreateDTO'
import {
  MobilidadeUpdateDTO,
  StatusMobilidade
} from '../../dtos/update/MobilidadeUpdateDTO'
import {
  createMobilidadeSchema,
  statusMobilidadeSchema,
  updateMobilidadeSchema
} from '../../schemas/MobilidadeSchema'

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
 * @returns {StatusMobilidade} Objeto validado contendo o status
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toValidateMobilidadeStatus(input: unknown): StatusMobilidade {
  return statusMobilidadeSchema.parse(input)
}
