import { ComentarioResponseDTO } from '../dtos/response/ComentarioResponseDTO'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { IComentarioService } from '../interfaces/services/IComentarioService'
import {
  toCreateComentarioDTO,
  toUpdateComentarioDTO
} from '../mappers/input/comentarioInputMapper'
import {
  toComentarioResponseDTO,
  toComentariosResponseDTO
} from '../mappers/output/comentarioOutputMapper'
import { throwIfNotFound } from '../utils/entityValidator'

export class ComentarioService implements IComentarioService {
  constructor(
    private comentarioRepository: IComentarioAccess,
    private usuarioRepository: IUsuarioAccess,
    private profissionalRepository: IProfissionalAccess
  ) {}

  async create(data: unknown): Promise<ComentarioResponseDTO> {
    const comentarioData = toCreateComentarioDTO(data)

    throwIfNotFound(
      await this.usuarioRepository.findById(comentarioData.usuarioId),
      'Usuário não encontrado.'
    )

    throwIfNotFound(
      await this.profissionalRepository.findById(comentarioData.profissionalId),
      'Profissional não encontrado.'
    )

    const comentario = await this.comentarioRepository.create(comentarioData)
    return toComentarioResponseDTO(comentario)
  }

  async findById(id: string): Promise<ComentarioResponseDTO> {
    const comentario = throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    return toComentarioResponseDTO(comentario)
  }

  async update(id: string, data: unknown): Promise<ComentarioResponseDTO> {
    const comentarioData = toUpdateComentarioDTO(data)

    throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    const comentario = await this.comentarioRepository.update(
      id,
      comentarioData
    )
    return toComentarioResponseDTO(comentario)
  }

  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.comentarioRepository.findById(id),
      'Comentário não encontrado.'
    )

    await this.comentarioRepository.delete(id)
  }

  async findAll(): Promise<ComentarioResponseDTO[]> {
    const comentarios = await this.comentarioRepository.findAll()
    return toComentariosResponseDTO(comentarios)
  }

  async findByProfissional(
    profissionalId: string
  ): Promise<ComentarioResponseDTO[]> {
    throwIfNotFound(
      await this.profissionalRepository.findById(profissionalId),
      'Profissional não encontrado.'
    )

    const comentarios = await this.comentarioRepository.findByProfissional(
      profissionalId
    )
    return toComentariosResponseDTO(comentarios)
  }

  async findVisibleByProfissional(
    profissionalId: string
  ): Promise<ComentarioResponseDTO[]> {
    const comentarios =
      await this.comentarioRepository.findVisibleByProfissional(profissionalId)
    return toComentariosResponseDTO(comentarios)
  }
}
