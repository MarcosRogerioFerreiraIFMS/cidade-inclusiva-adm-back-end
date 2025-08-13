export interface ComentarioResponseDTO {
  id: string
  likes: number
  conteudo: string
  visivel: boolean
  entidadeId: string
  entidadeTipo: string
  criadoEm: Date
  atualizadoEm: Date
}
