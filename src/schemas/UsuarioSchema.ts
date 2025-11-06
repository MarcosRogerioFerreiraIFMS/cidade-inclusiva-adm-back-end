import { z } from 'zod'
import {
  emailSchema,
  enderecoSchema,
  fotoSchema,
  nomeSchema,
  telefoneSchema
} from './CommonSchemas'

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
  nome: nomeSchema,

  telefone: telefoneSchema,

  foto: fotoSchema,

  email: emailSchema,

  senha: z
    .string({
      required_error: 'A senha é obrigatória.',
      invalid_type_error: 'A senha deve ser uma string.'
    })
    .transform((val) => val.trim())
    .refine((val) => val.length >= SENHA_MIN_LENGTH, {
      message: `A senha deve ter pelo menos ${SENHA_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= SENHA_MAX_LENGTH, {
      message: `A senha deve ter no máximo ${SENHA_MAX_LENGTH} caracteres.`
    }),

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

/**
 * - Schema de validação Zod para criação de administrador
 * - Inclui todos os campos do usuário (foto e endereço são opcionais)
 * - Usado apenas por outros administradores
 */
export const createAdminSchema = z.object({
  nome: createUsuarioSchema.shape.nome,
  telefone: createUsuarioSchema.shape.telefone,
  email: createUsuarioSchema.shape.email,
  senha: createUsuarioSchema.shape.senha,
  foto: createUsuarioSchema.shape.foto,
  endereco: createUsuarioSchema.shape.endereco.optional()
})
