import {
  sanitizeString,
  sanitizeTelefone,
  validateBrazilianCellPhone,
  validatePersonName,
  validateStrongPassword
} from '@/utils'
import { z } from 'zod'
import { createEmailSchema, enderecoSchema, fotoOpcionalSchema } from './'

/** Comprimento mínimo permitido para senhas */
const SENHA_MIN_LENGTH = 8
/** Comprimento máximo permitido para senhas */
const SENHA_MAX_LENGTH = 128

/**
 * - Schema de validação Zod para criação de usuário
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações específicas para dados brasileiros (CEP, telefone, estados)
 */
export const createUsuarioSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório.',
      invalid_type_error: 'O nome deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine(
      (val) => {
        const validation = validatePersonName(val)
        return validation.isValid
      },
      (val) => {
        const validation = validatePersonName(val)
        return {
          message: `Erro no nome: ${validation.errors.join(', ')}.`
        }
      }
    ),

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório.',
      invalid_type_error: 'O telefone deve ser uma string.'
    })
    .transform((val) => sanitizeTelefone(val.trim()))
    .refine((val) => validateBrazilianCellPhone(val), {
      message:
        'O telefone deve ser um celular brasileiro válido (11 dígitos com DDD válido e iniciado por 9).'
    }),

  foto: fotoOpcionalSchema,

  email: createEmailSchema,

  senha: z
    .string({
      required_error: 'A senha é obrigatória.',
      invalid_type_error: 'A senha deve ser uma string.'
    })
    .min(
      SENHA_MIN_LENGTH,
      `A senha deve ter pelo menos ${SENHA_MIN_LENGTH} caracteres.`
    )
    .max(
      SENHA_MAX_LENGTH,
      `A senha deve ter no máximo ${SENHA_MAX_LENGTH} caracteres.`
    )
    .refine(
      (val) => {
        const validation = validateStrongPassword(val)
        return validation.isValid
      },
      (val) => {
        const validation = validateStrongPassword(val)
        return {
          message: `Senha não atende aos critérios de segurança: ${validation.errors.join(
            ', '
          )}.`
        }
      }
    ),

  endereco: enderecoSchema
})

/**
 * - Schema de validação Zod para atualização de usuário
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateUsuarioSchema = createUsuarioSchema.partial().extend({
  endereco: createUsuarioSchema.shape.endereco.partial().optional()
})
