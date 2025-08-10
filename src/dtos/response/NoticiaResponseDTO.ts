export interface NoticiaResponseDTO {
  id: string
  foto: string | null
  titulo: string
  conteudo: string
  url: string | null
  dataPublicacao: Date
  categoria: string
}
