import { EspecialidadeProfissional } from '@/enums'
import { z } from 'zod'
import {
  emailSchema,
  fotoSchema,
  nomeSchema,
  telefoneSchema
} from './CommonSchemas'

/**
 * - Schema de validação Zod para criação de profissional
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações específicas para telefone, email e especialidades
 */
export const createProfissionalSchema = z.object({
  nome: nomeSchema,

  foto: fotoSchema,

  telefone: telefoneSchema,

  email: emailSchema,

  especialidade: z
    .string({
      required_error: 'A especialidade é obrigatória.',
      invalid_type_error: 'A especialidade deve ser uma string.'
    })
    .min(1, 'A especialidade não pode estar vazia.')
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(EspecialidadeProfissional).includes(
          val as EspecialidadeProfissional
        ),
      {
        message: `Especialidade inválida. Valores aceitos: ${Object.values(
          EspecialidadeProfissional
        ).join(', ')}.`
      }
    )
    .transform((val) => val as EspecialidadeProfissional)
})

/**
 * - Schema de validação Zod para atualização de profissional
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateProfissionalSchema = createProfissionalSchema.partial()
