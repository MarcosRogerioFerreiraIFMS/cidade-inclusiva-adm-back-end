import { NoticiaResponseDTO } from '../../dtos/response/NoticiaResponseDTO'
import { NoticiaCompletions } from '../../types/NoticiaTypes'

import { capitalizeWords } from '../../utils/stringUtils'
import { toFotoResponseDTO } from './fotoOutputMapper'

/**
 * - Converte entidade Noticia completa para DTO de resposta
 * - Formata campos opcionais e aplica transformações de apresentação
 * @param {NoticiaCompletions} noticia - Entidade noticia completa do banco de dados
 * @returns {NoticiaResponseDTO} DTO formatado para resposta da API
 */
export function toNoticiaResponseDTO(
  noticia: NoticiaCompletions
): NoticiaResponseDTO {
  return {
    id: noticia.id,
    titulo: noticia.titulo,
    conteudo: noticia.conteudo,
    dataPublicacao: noticia.dataPublicacao,
    categoria: capitalizeWords(noticia.categoria),
    criadoEm: noticia.criadoEm,
    foto: toFotoResponseDTO(noticia.foto),
    url: noticia.url ?? undefined
  }
}

/**
 * - Converte lista de entidades Noticia para lista de DTOs de resposta
 * - Aplica transformação individual para cada notícia da lista
 * @param {NoticiaCompletions[]} noticias - Lista de entidades noticia do banco de dados
 * @returns {NoticiaResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toNoticiasResponseDTO(
  noticias: NoticiaCompletions[]
): NoticiaResponseDTO[] {
  return noticias.map(toNoticiaResponseDTO)
}
