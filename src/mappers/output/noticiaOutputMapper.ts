import { Noticia } from '@prisma/client'
import { NoticiaResponseDTO } from '../../dtos/response/NoticiaResponseDTO'

export function toNoticiaResponseDTO(noticia: Noticia): NoticiaResponseDTO {
  return {
    id: noticia.id,
    titulo: noticia.titulo,
    conteudo: noticia.conteudo,
    dataPublicacao: noticia.dataPublicacao,
    categoria: noticia.categoria,
    foto: noticia.foto || null,
    url: noticia.url || null
  }
}

export function toNoticiasResponseDTO(
  noticias: Noticia[]
): NoticiaResponseDTO[] {
  return noticias.map(toNoticiaResponseDTO)
}
