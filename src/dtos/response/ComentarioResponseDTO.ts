import { LikeResponseDTO } from './LikeResponseDTO'

export interface ComentarioResponseDTO {
  id: string
  conteudo: string
  visivel: boolean
  usuarioId: string
  profissionalId?: string
  criadoEm: Date
  atualizadoEm: Date
  likes: LikeResponseDTO[]
}
