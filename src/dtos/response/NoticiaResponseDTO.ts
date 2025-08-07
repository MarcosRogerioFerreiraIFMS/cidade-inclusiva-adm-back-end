import { CategoriaNoticia } from '@prisma/client'

export interface NoticiaResponseDTO {
  id: string
  foto: string | null
  titulo: string
  conteudo: string
  url: string | null
  dataPublicacao: Date
  categoria: CategoriaNoticia
}
