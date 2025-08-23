import { NoticiaResponseDTO } from '../../dtos/response/NoticiaResponseDTO'
import { NoticiaCompletions } from '../../types/NoticiaTypes'

import { capitalizeWords } from '../../utils/stringUtils'

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
    foto: noticia.foto ?? undefined,
    url: noticia.url ?? undefined
  }
}

export function toNoticiasResponseDTO(
  noticias: NoticiaCompletions[]
): NoticiaResponseDTO[] {
  return noticias.map(toNoticiaResponseDTO)
}
