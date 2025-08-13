import { ComentarioResponseDTO } from '../dtos/response/ComentarioResponseDTO'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IComentarioAccess } from '../interfaces/access/IComentarioAccess'
import { IProfissionalAccess } from '../interfaces/access/IProfissionalAccess'
import { IComentarioService } from '../interfaces/services/IComentarioService'
import {
  toCreateComentarioDTO,
  toUpdateComentarioDTO
} from '../mappers/input/comentarioInputMapper'
import {
  toComentarioResponseDTO,
  toComentariosResponseDTO
} from '../mappers/output/comentarioOutputMapper'
import { validateEntidadeTipoComentarioSchema } from '../schemas/ComentarioSchema'
import { HttpError } from '../utils/HttpError'

export class ComentarioService implements IComentarioService {
  constructor(
    private comentarioRepository: IComentarioAccess,
    private profissionalRepository: IProfissionalAccess
  ) {}

  async create(data: unknown): Promise<ComentarioResponseDTO> {
    const comentarioData = await toCreateComentarioDTO(data)

    await this.validateEntidadeExists(
      comentarioData.entidadeId,
      comentarioData.entidadeTipo
    )

    const comentario = await this.comentarioRepository.create(comentarioData)

    return toComentarioResponseDTO(comentario)
  }

  async findById(id: string): Promise<ComentarioResponseDTO> {
    const comentario = await this.comentarioRepository.findById(id)

    if (!comentario) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    return toComentarioResponseDTO(comentario)
  }

  async update(id: string, data: unknown): Promise<ComentarioResponseDTO> {
    const existingComentario = await this.comentarioRepository.findById(id)
    if (!existingComentario) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    const updateData = await toUpdateComentarioDTO(data)

    const comentario = await this.comentarioRepository.update(id, updateData)

    return toComentarioResponseDTO(comentario)
  }

  async delete(id: string): Promise<void> {
    const comentario = await this.comentarioRepository.findById(id)
    if (!comentario) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    await this.comentarioRepository.delete(id)
  }

  async findAll(): Promise<ComentarioResponseDTO[]> {
    const comentarios = await this.comentarioRepository.findAll()

    if (!comentarios || comentarios.length === 0) {
      return []
    }

    return toComentariosResponseDTO(comentarios)
  }

  async findByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<ComentarioResponseDTO[]> {
    const { entidadeTipo: validatedEntidadeTipo } =
      validateEntidadeTipoComentarioSchema.parse({
        entidadeTipo
      })

    const comentarios = await this.comentarioRepository.findByEntidade(
      entidadeId,
      validatedEntidadeTipo
    )

    if (!comentarios || comentarios.length === 0) {
      return []
    }

    return toComentariosResponseDTO(comentarios)
  }

  async findVisibleByEntidade(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<ComentarioResponseDTO[]> {
    const { entidadeTipo: validatedEntidadeTipo } =
      validateEntidadeTipoComentarioSchema.parse({
        entidadeTipo
      })

    const comentarios = await this.comentarioRepository.findVisibleByEntidade(
      entidadeId,
      validatedEntidadeTipo
    )

    if (!comentarios || comentarios.length === 0) {
      return []
    }

    return toComentariosResponseDTO(comentarios)
  }

  async incrementLikes(
    id: string,
    increment?: number
  ): Promise<ComentarioResponseDTO> {
    const existingComentario = await this.comentarioRepository.findById(id)
    if (!existingComentario) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    const incrementValue = increment ?? 1

    if (existingComentario.likes + incrementValue < 0) {
      throw new HttpError(
        'Os likes não podem ser negativos.',
        HttpStatusCode.BAD_REQUEST
      )
    }

    const comentario = await this.comentarioRepository.incrementLikes(
      id,
      incrementValue
    )

    return toComentarioResponseDTO(comentario)
  }

  private async validateEntidadeExists(
    entidadeId: string,
    entidadeTipo: string
  ): Promise<void> {
    const { entidadeTipo: validatedEntidadeTipo } =
      validateEntidadeTipoComentarioSchema.parse({
        entidadeTipo
      })

    if (validatedEntidadeTipo === 'PROFISSIONAL') {
      const profissional = await this.profissionalRepository.findById(
        entidadeId
      )
      if (!profissional) {
        throw new HttpError(
          'Profissional não encontrado.',
          HttpStatusCode.NOT_FOUND
        )
      }
    } else {
      throw new HttpError(
        'Tipo de entidade inválido.',
        HttpStatusCode.BAD_REQUEST
      )
    }
  }
}
