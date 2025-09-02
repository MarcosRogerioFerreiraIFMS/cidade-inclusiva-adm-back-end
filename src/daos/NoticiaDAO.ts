import { db } from '../database/prisma'
import { NoticiaCreateDTO } from '../dtos/create/NoticiaCreateDTO'
import { NoticiaUpdateDTO } from '../dtos/update/NoticiaUpdateDTO'
import {
  generateDataNoticiaCreate,
  generateDataNoticiaUpdate
} from '../helpers/generateDataNoticia'
import { INoticiaAccess } from '../interfaces/access/INoticiaAccess'
import { NoticiaCompletions } from '../types/NoticiaTypes'

/**
 * DAO (Data Access Object) para operações de notícias no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 * - Implementa operações CRUD específicas para a entidade Noticia
 */
export class NoticiaDAO implements INoticiaAccess {
  /**
   * Cria uma nova notícia no banco de dados
   * @param {NoticiaCreateDTO} data - Dados da notícia a ser criada
   * @returns {Promise<NoticiaCompletions>} Notícia criada
   */
  async create(data: NoticiaCreateDTO): Promise<NoticiaCompletions> {
    const dataToCreate = generateDataNoticiaCreate(data)

    const noticia = await db.noticia.create({
      data: dataToCreate
    })

    return noticia
  }

  /**
   * Busca uma notícia por ID no banco de dados
   * @param {string} id - ID único da notícia
   * @returns {Promise<NoticiaCompletions | null>} Notícia encontrada ou null
   */
  async findById(id: string): Promise<NoticiaCompletions | null> {
    return await db.noticia.findUnique({
      where: { id }
    })
  }

  /**
   * Atualiza os dados de uma notícia no banco de dados
   * @param {string} id - ID único da notícia
   * @param {NoticiaUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<NoticiaCompletions>} Notícia atualizada
   */
  async update(
    id: string,
    data: NoticiaUpdateDTO
  ): Promise<NoticiaCompletions> {
    const dataToUpdate = generateDataNoticiaUpdate(data)

    const noticia = await db.noticia.update({
      where: { id },
      data: dataToUpdate
    })

    return noticia
  }

  /**
   * Remove uma notícia do banco de dados
   * @param {string} id - ID único da notícia a ser removida
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.noticia.delete({ where: { id } })
  }

  /**
   * Lista todas as notícias do banco de dados
   * Ordena por data de publicação decrescente (mais recentes primeiro)
   * @returns {Promise<NoticiaCompletions[]>} Lista de todas as notícias ordenadas
   */
  async findAll(): Promise<NoticiaCompletions[]> {
    return await db.noticia.findMany({
      orderBy: {
        dataPublicacao: 'desc'
      }
    })
  }
}
