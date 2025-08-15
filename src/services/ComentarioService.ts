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
    const comentarioData = toCreateComentarioDTO(data)

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
    await this.validateComentarioExists(id)

    const updateData = toUpdateComentarioDTO(data)
    const comentario = await this.comentarioRepository.update(id, updateData)

    return toComentarioResponseDTO(comentario)
  }

  async delete(id: string): Promise<void> {
    await this.validateComentarioExists(id)
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

    await this.validateEntidadeExists(entidadeId, validatedEntidadeTipo)

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

    await this.validateEntidadeExists(entidadeId, validatedEntidadeTipo)

    const comentarios = await this.comentarioRepository.findVisibleByEntidade(
      entidadeId,
      validatedEntidadeTipo
    )

    if (!comentarios || comentarios.length === 0) {
      return []
    }

    return toComentariosResponseDTO(comentarios)
  }

  async incrementLikes(id: string): Promise<ComentarioResponseDTO> {
    await this.validateComentarioExists(id)

    const comentario = await this.comentarioRepository.incrementLikes(id)

    return toComentarioResponseDTO(comentario)
  }

  async decrementLikes(id: string): Promise<ComentarioResponseDTO> {
    const comentario = await this.comentarioRepository.findById(id)

    if (!comentario) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }

    if (comentario.likes < 1) {
      throw new HttpError(
        'Não é possível decrementar likes. O número de likes já é zero.',
        HttpStatusCode.BAD_REQUEST
      )
    }

    const comentarioUpdated = await this.comentarioRepository.decrementLikes(id)

    return toComentarioResponseDTO(comentarioUpdated)
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

  private async validateComentarioExists(id: string): Promise<void> {
    const comentario = await this.comentarioRepository.findById(id)
    if (!comentario) {
      throw new HttpError(
        'Comentário não encontrado.',
        HttpStatusCode.NOT_FOUND
      )
    }
  }
}
