import { NoticiaResponseDTO } from '@/dtos/response'
import { INoticiaAccess } from '@/interfaces/access'
import { INoticiaService } from '@/interfaces/services'
import { toCreateNoticiaDTO, toUpdateNoticiaDTO } from '@/mappers/input'
import { toNoticiaResponseDTO, toNoticiasResponseDTO } from '@/mappers/output'
import { throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio relacionada a notícias:
 * - Implementa a interface INoticiaService e gerencia operações CRUD de notícias
 * - Aplica validações, transformações de dados e regras de negócio específicas
 */
export class NoticiaService implements INoticiaService {
  /**
   * Construtor do serviço de notícias
   * @param {INoticiaAccess} noticiaRepository - Repositório para acesso aos dados de notícias
   */
  constructor(private noticiaRepository: INoticiaAccess) {}

  /**
   * Cria uma nova notícia no sistema:
   * - Valida os dados de entrada e transforma em DTO apropriado
   * @param {unknown} data - Dados da notícia a ser criada
   * @returns {Promise<NoticiaResponseDTO>} Dados da notícia criada
   */
  async create(data: unknown): Promise<NoticiaResponseDTO> {
    return toNoticiaResponseDTO(
      await this.noticiaRepository.create(await toCreateNoticiaDTO(data))
    )
  }

  /**
   * Busca uma notícia específica pelo ID:
   * - Valida se a notícia existe antes de retornar
   * @param {string} id - ID único da notícia
   * @returns {Promise<NoticiaResponseDTO>} Dados da notícia encontrada
   * @throws {HttpError} Erro 404 se a notícia não for encontrada
   */
  async findById(id: string): Promise<NoticiaResponseDTO> {
    const noticia = throwIfNotFound(
      await this.noticiaRepository.findById(id),
      'Notícia não encontrada.'
    )

    return toNoticiaResponseDTO(noticia)
  }

  /**
   * Atualiza uma notícia existente:
   * - Valida se a notícia existe antes de atualizar
   * @param {string} id - ID único da notícia a ser atualizada
   * @param {unknown} data - Novos dados da notícia
   * @returns {Promise<NoticiaResponseDTO>} Dados da notícia atualizada
   * @throws {HttpError} Erro 404 se a notícia não for encontrada
   */
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

  /**
   * Remove uma notícia do sistema:
   * - Valida se a notícia existe antes de remover
   * @param {string} id - ID único da notícia a ser removida
   * @returns {Promise<void>}
   * @throws {HttpError} Erro 404 se a notícia não for encontrada
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.noticiaRepository.findById(id),
      'Notícia não encontrada.'
    )

    await this.noticiaRepository.delete(id)
  }

  /**
   * Recupera todas as notícias do sistema:
   * - Retorna lista vazia se não houver notícias
   * @returns {Promise<NoticiaResponseDTO[]>} Lista de todas as notícias
   */
  async findAll(): Promise<NoticiaResponseDTO[]> {
    const noticias = await this.noticiaRepository.findAll()

    if (!noticias || noticias.length === 0) {
      return []
    }

    return toNoticiasResponseDTO(noticias)
  }
}
