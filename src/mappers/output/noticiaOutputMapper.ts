import { Noticia } from '@prisma/client'
import { NoticiaResponseDTO } from '../../dtos/response/NoticiaResponseDTO'
import { capitalizeWords } from '../../utils/stringUtils'

export function toNoticiaResponseDTO(noticia: Noticia): NoticiaResponseDTO {
  return {
    id: noticia.id,
    titulo: noticia.titulo,
    conteudo: noticia.conteudo,
    dataPublicacao: noticia.dataPublicacao,
    categoria: capitalizeWords(noticia.categoria),
    foto: noticia.foto ?? '',
    url: noticia.url ?? ''
  }
}

export function toNoticiasResponseDTO(
  noticias: Noticia[]
): NoticiaResponseDTO[] {
  return noticias.map(toNoticiaResponseDTO)
}
