import { db } from '@/database/prisma'
import { UsuarioCreateDTO } from '@/dtos/create'
import { UsuarioUpdateDTO } from '@/dtos/update'
import { generateDataUsuarioCreate, generateDataUsuarioUpdate } from '@/helpers'
import { IUsuarioAccess } from '@/interfaces/access'
import { UsuarioCompletions } from '@/types'

/**
 * DAO (Data Access Object) para operações de usuários no banco de dados
 * Responsável pela interação direta com o Prisma ORM e banco de dados
 */
export class UsuarioDAO implements IUsuarioAccess {
  /**
   * Cria um novo usuário no banco de dados
   * @param {UsuarioCreateDTO} data - Dados do usuário a ser criado
   * @returns {Promise<UsuarioCompletions>} Usuário criado com todas as relações
   */
  async create(data: UsuarioCreateDTO): Promise<UsuarioCompletions> {
    const dataToCreate = await generateDataUsuarioCreate(data)
    return await db.usuario.create({
      data: dataToCreate,
      include: {
        endereco: true,
        foto: true
      }
    })
  }

  /**
   * Busca um usuário por ID no banco de dados
   * @param {string} id - ID único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findById(id: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { id },
      include: {
        endereco: true,
        foto: true
      }
    })
  }

  /**
   * Busca um usuário por email no banco de dados
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { email },
      include: {
        endereco: true,
        foto: true
      }
    })
  }

  /**
   * Busca um usuário por telefone no banco de dados
   * @param {string} telefone - Telefone único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByTelefone(telefone: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { telefone },
      include: {
        endereco: true,
        foto: true
      }
    })
  }

  /**
   * Atualiza os dados de um usuário no banco de dados
   * @param {string} id - ID único do usuário
   * @param {UsuarioUpdateDTO} data - Dados a serem atualizados
   * @returns {Promise<UsuarioCompletions>} Usuário atualizado com todas as relações
   */
  async update(
    id: string,
    data: UsuarioUpdateDTO
  ): Promise<UsuarioCompletions> {
    const dataToUpdate = await generateDataUsuarioUpdate(data, id)

    return await db.usuario.update({
      where: { id },
      data: dataToUpdate,
      include: {
        endereco: true,
        foto: true
      }
    })
  }

  /**
   * Remove um usuário do banco de dados
   * @param {string} id - ID único do usuário a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.usuario.delete({
      where: { id }
    })
  }

  /**
   * Lista todos os usuários do banco de dados
   * @returns {Promise<UsuarioCompletions[]>} Lista de todos os usuários com suas relações
   */
  async findAll(): Promise<UsuarioCompletions[]> {
    return await db.usuario.findMany({
      include: {
        endereco: true,
        foto: true
      }
    })
  }
}
