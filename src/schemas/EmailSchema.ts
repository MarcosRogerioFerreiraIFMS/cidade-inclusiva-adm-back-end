import { z } from 'zod'

export const createEmailSchema = z
  .string({
    required_error: 'O email é obrigatório.',
    invalid_type_error: 'O email deve ser uma string.'
  })
  .email('O email deve ter um formato válido (ex: empresa@dominio.com).')
  .transform((val) => val.trim().toLowerCase())
  .refine((val) => val.length <= 254, {
    message: 'O email deve ter no máximo 254 caracteres.'
  })
  .refine((val) => !val.includes('..'), {
    message: 'O email não pode conter pontos consecutivos.'
  })

export const loginEmailSchema = createEmailSchema
