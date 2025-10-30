/**
 * Enum para definir os tipos de entidades que podem receber comentários
 * - Usado para validar e identificar a qual entidade um comentário pertence
 */
export enum TipoEntidadeComentario {
  PROFISSIONAL = 'PROFISSIONAL',
  MOTORISTA = 'MOTORISTA',
  MANUTENCAO = 'MANUTENCAO',
  ACESSIBILIDADE_URBANA = 'ACESSIBILIDADE_URBANA'
}

/**
 * Array com todos os valores do enum para validações e iterações
 */
export const TIPOS_ENTIDADE_COMENTARIO = Object.values(TipoEntidadeComentario)

/**
 * Função utilitária para verificar se um valor é um tipo de entidade válido
 */
export function isTipoEntidadeComentarioValido(
  valor: string
): valor is TipoEntidadeComentario {
  return TIPOS_ENTIDADE_COMENTARIO.includes(valor as TipoEntidadeComentario)
}
