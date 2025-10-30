import type { createComentarioSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de comentário
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar um novo comentário
 */
export type ComentarioCreateDTO = z.infer<typeof createComentarioSchema>

/**
 * DTO estendido para criação de comentário com relacionamento opcional
 * Inclui campos adicionais necessários para associar comentário às diferentes entidades
 */
export interface ComentarioCreateRelationalDTO extends ComentarioCreateDTO {
  /** ID opcional do profissional ao qual o comentário será associado */
  profissionalId?: string
  /** ID opcional do motorista ao qual o comentário será associado */
  motoristaId?: string
  /** ID opcional da manutenção à qual o comentário será associado */
  manutencaoId?: string
  /** ID opcional da acessibilidade urbana à qual o comentário será associado */
  acessibilidadeUrbanaId?: string
}
