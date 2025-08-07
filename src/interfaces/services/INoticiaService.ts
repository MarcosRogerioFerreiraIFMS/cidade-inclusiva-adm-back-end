import { NoticiaResponseDTO } from '../../dtos/response/NoticiaResponseDTO'

export interface INoticiaService {
  create(data: unknown): Promise<NoticiaResponseDTO>
  findById(id: string): Promise<NoticiaResponseDTO>
  update(id: string, data: unknown): Promise<NoticiaResponseDTO>
  delete(id: string): Promise<void>
  findAll(): Promise<NoticiaResponseDTO[]>
}
