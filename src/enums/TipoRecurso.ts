/**
 * Enum global para definir os tipos de recursos do sistema
 * - Usado para identificar e validar recursos em middlewares e serviços
 */
export enum TipoRecurso {
  USUARIO = 'USUARIO',
  COMENTARIO = 'COMENTARIO',
  LIKE = 'LIKE',
  MOBILIDADE = 'MOBILIDADE',
  NOTICIA = 'NOTICIA',
  PROFISSIONAL = 'PROFISSIONAL',
  MANUTENCAO = 'MANUTENCAO'
}

/**
 * Tipo que representa todos os valores possíveis do enum TipoRecurso
 */
export type TipoRecursoType = keyof typeof TipoRecurso

/**
 * Array com todos os valores do enum para validações e iterações
 */
export const TIPOS_RECURSO = Object.values(TipoRecurso)

/**
 * Função utilitária para verificar se um valor é um tipo de recurso válido
 */
export function isTipoRecursoValido(valor: string): valor is TipoRecurso {
  return TIPOS_RECURSO.includes(valor as TipoRecurso)
}
