import { TipoRecurso, isTipoRecursoValido } from '@/enums'

/**
 * Utilitário para trabalhar com recursos do sistema
 */
export class RecursoUtil {
  /**
   * Valida se o tipo de recurso é válido
   */
  static validarTipoRecurso(tipo: string): boolean {
    return isTipoRecursoValido(tipo)
  }

  /**
   * Retorna todos os tipos de recursos disponíveis
   */
  static getTiposRecursos(): TipoRecurso[] {
    return Object.values(TipoRecurso)
  }

  /**
   * Converte string para TipoRecurso se for válido
   */
  static stringParaTipoRecurso(valor: string): TipoRecurso | null {
    if (isTipoRecursoValido(valor)) {
      return valor as TipoRecurso
    }
    return null
  }

  /**
   * Verifica se um recurso é do tipo especificado
   */
  static isRecursoDoTipo(
    tipo: TipoRecurso,
    tipoComparar: TipoRecurso
  ): boolean {
    return tipo === tipoComparar
  }
}
