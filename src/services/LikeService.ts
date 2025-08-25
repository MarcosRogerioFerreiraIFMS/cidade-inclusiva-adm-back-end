import { LikeResponseDTO } from '../dtos/response/LikeResponseDTO'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'
import { ILikeAccess } from '../interfaces/access/ILikeAccess'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { ILikeService } from '../interfaces/services/ILikeService'
import {
  toLikeResponseDTO,
  toLikesResponseDTO
} from '../mappers/output/likeOutputMapper'
import { throwIfNotFound } from '../utils/entityValidator'

export class LikeService implements ILikeService {
  constructor(
    private likeRepository: ILikeAccess,
    private usuarioRepository: IUsuarioAccess,
    private comentarioRepository: IComentarioAccess
  ) {}

  async findById(id: string): Promise<LikeResponseDTO> {
    const like = throwIfNotFound(
      await this.likeRepository.findById(id),
      'Like não encontrado.'
    )

    return toLikeResponseDTO(like)
  }

  async toggle(
    usuarioId: string,
    comentarioId: string
  ): Promise<{ liked: boolean; totalLikes: number }> {
    const [usuario, comentario] = await Promise.all([
      this.usuarioRepository.findById(usuarioId),
      this.comentarioRepository.findById(comentarioId)
    ])

    throwIfNotFound(usuario, 'Usuário não encontrado.')
    throwIfNotFound(comentario, 'Comentário não encontrado.')

    const existingLike = await this.likeRepository.findByUsuarioAndComentario(
      usuarioId,
      comentarioId
    )

    if (existingLike) {
      await this.likeRepository.deleteByUsuarioAndComentario(
        usuarioId,
        comentarioId
      )
      const totalLikes = await this.likeRepository.countByComentario(
        comentarioId
      )
      return { liked: false, totalLikes }
    } else {
      await this.likeRepository.create({ usuarioId, comentarioId })
      const totalLikes = await this.likeRepository.countByComentario(
        comentarioId
      )
      return { liked: true, totalLikes }
    }
  }

  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.likeRepository.findById(id),
      'Like não encontrado.'
    )

    await this.likeRepository.delete(id)
  }

  async findByComentario(comentarioId: string): Promise<LikeResponseDTO[]> {
    throwIfNotFound(
      await this.comentarioRepository.findById(comentarioId),
      'Comentário não encontrado.'
    )

    const likes = await this.likeRepository.findByComentario(comentarioId)
    return toLikesResponseDTO(likes)
  }

  async findByUsuario(usuarioId: string): Promise<LikeResponseDTO[]> {
    throwIfNotFound(
      await this.usuarioRepository.findById(usuarioId),
      'Usuário não encontrado.'
    )

    const likes = await this.likeRepository.findByUsuario(usuarioId)
    return toLikesResponseDTO(likes)
  }
}
