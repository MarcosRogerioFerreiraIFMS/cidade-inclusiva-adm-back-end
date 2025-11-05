import { z } from 'zod'

export const createEmailSchema = z
  .string()
  .email('Email inválido.')
  .transform((val) => val.trim().toLowerCase())
  .refine((val) => val.length <= 254, {
    message: 'O email deve ter no máximo 254 caracteres.'
  })

export const loginEmailSchema = createEmailSchema
