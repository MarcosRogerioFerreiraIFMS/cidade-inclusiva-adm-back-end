import { NoticiaResponseDTO } from '../dtos/response/NoticiaResponseDTO'
import { INoticiaAccess } from '../interfaces/access/INoticiaAccess'
import { INoticiaService } from '../interfaces/services/INoticiaService'
import {
  toCreateNoticiaDTO,
  toUpdateNoticiaDTO
} from '../mappers/input/noticiaInputMapper'
import {
  toNoticiaResponseDTO,
  toNoticiasResponseDTO
} from '../mappers/output/noticiaOutputMapper'
import { throwIfNotFound } from '../utils/entityValidator'

export class NoticiaService implements INoticiaService {
  constructor(private noticiaRepository: INoticiaAccess) {}

  async create(data: unknown): Promise<NoticiaResponseDTO> {
    return toNoticiaResponseDTO(
      await this.noticiaRepository.create(await toCreateNoticiaDTO(data))
    )
  }

  async findById(id: string): Promise<NoticiaResponseDTO> {
    const noticia = throwIfNotFound(
      await this.noticiaRepository.findById(id),
      'Notícia não encontrada.'
    )

    return toNoticiaResponseDTO(noticia)
  }

  async update(id: string, data: unknown): Promise<NoticiaResponseDTO> {
    throwIfNotFound(
      await this.noticiaRepository.findById(id),
      'Notícia não encontrada.'
    )

    const noticia = await this.noticiaRepository.update(
      id,
      await toUpdateNoticiaDTO(data)
    )

    return toNoticiaResponseDTO(noticia)
  }

  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.noticiaRepository.findById(id),
      'Notícia não encontrada.'
    )

    await this.noticiaRepository.delete(id)
  }

  async findAll(): Promise<NoticiaResponseDTO[]> {
    const noticias = await this.noticiaRepository.findAll()

    if (!noticias || noticias.length === 0) {
      return []
    }

    return toNoticiasResponseDTO(noticias)
  }
}
