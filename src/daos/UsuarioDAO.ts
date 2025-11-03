import { db } from '@/database/prisma'
import type { AdminCreateDTO, UsuarioCreateDTO } from '@/dtos/create'
import type { UsuarioUpdateDTO } from '@/dtos/update'
import { TipoUsuario } from '@/enums'
import {
  generateDataAdminCreate,
  generateDataUsuarioCreate,
  generateDataUsuarioUpdate
} from '@/helpers'
import type { IUsuarioAccess } from '@/interfaces/access'
import type { UsuarioCompletions } from '@/types'

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
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Cria um novo administrador no banco de dados
   * @param {AdminCreateDTO} data - Dados do administrador a ser criado
   * @returns {Promise<UsuarioCompletions>} Administrador criado com todas as relações
   */
  async createAdmin(data: AdminCreateDTO): Promise<UsuarioCompletions> {
    const dataToCreate = await generateDataAdminCreate(data)
    return await db.usuario.create({
      data: dataToCreate,
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Busca um usuário por ID no banco de dados
   * @param {string} id - ID único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findById(id: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { id, deletadoEm: null },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Busca um usuário por email no banco de dados
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { email, deletadoEm: null },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Busca um usuário por email incluindo deletados
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByEmailIncludingDeleted(
    email: string
  ): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { email },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Busca um usuário por telefone no banco de dados
   * @param {string} telefone - Telefone único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByTelefone(telefone: string): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { telefone, deletadoEm: null },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Busca um usuário por telefone incluindo deletados
   * @param {string} telefone - Telefone único do usuário
   * @returns {Promise<UsuarioCompletions | null>} Usuário encontrado ou null
   */
  async findByTelefoneIncludingDeleted(
    telefone: string
  ): Promise<UsuarioCompletions | null> {
    return await db.usuario.findUnique({
      where: { telefone },
      include: { endereco: true, foto: true }
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
    // Verifica se o usuário existe e não foi soft-deletado
    const usuarioExistente = await db.usuario.findFirst({
      where: { id, deletadoEm: null }
    })

    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado ou já deletado.')
    }

    // Gera os dados atualizados
    const dataToUpdate = await generateDataUsuarioUpdate(data, id)

    // Atualiza normalmente
    return await db.usuario.update({
      where: { id },
      data: dataToUpdate,
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Remove um usuário do banco de dados
   * @param {string} id - ID único do usuário a ser removido
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await db.usuario.update({
      where: { id },
      data: { deletadoEm: new Date() }
    })
  }

  /**
   * Restaura um usuário soft-deleted
   * @param {string} id - ID único do usuário a ser restaurado
   * @returns {Promise<UsuarioCompletions>} Usuário restaurado
   */
  async restore(id: string): Promise<UsuarioCompletions> {
    return await db.usuario.update({
      where: { id },
      data: { deletadoEm: null },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Restaura e atualiza um usuário soft-deleted com novos dados
   * @param {string} id - ID único do usuário a ser restaurado
   * @param {UsuarioCreateDTO} data - Novos dados do usuário
   * @returns {Promise<UsuarioCompletions>} Usuário restaurado e atualizado
   */
  async restoreAndUpdate(
    id: string,
    data: UsuarioCreateDTO
  ): Promise<UsuarioCompletions> {
    // Primeiro, deletar o endereço antigo se existir
    await db.endereco.deleteMany({
      where: { usuarioId: id }
    })

    // Agora criar o novo usuário com os novos dados
    const dataToUpdate = await generateDataUsuarioCreate(data)

    return await db.usuario.update({
      where: { id },
      data: {
        ...dataToUpdate,
        deletadoEm: null
      },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Restaura e atualiza um administrador soft-deleted com novos dados
   * @param {string} id - ID único do administrador a ser restaurado
   * @param {AdminCreateDTO} data - Novos dados do administrador
   * @returns {Promise<UsuarioCompletions>} Administrador restaurado e atualizado
   */
  async restoreAndUpdateAdmin(
    id: string,
    data: AdminCreateDTO
  ): Promise<UsuarioCompletions> {
    // Primeiro, deletar o endereço antigo se existir
    await db.endereco.deleteMany({
      where: { usuarioId: id }
    })

    // Agora criar o novo administrador com os novos dados
    const dataToUpdate = await generateDataAdminCreate(data)

    return await db.usuario.update({
      where: { id },
      data: {
        ...dataToUpdate,
        deletadoEm: null
      },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Lista todos os usuários do banco de dados
   * @returns {Promise<UsuarioCompletions[]>} Lista de todos os usuários com suas relações
   */
  async findAll(): Promise<UsuarioCompletions[]> {
    return await db.usuario.findMany({
      where: { deletadoEm: null },
      orderBy: { criadoEm: 'desc' },
      include: { endereco: true, foto: true }
    })
  }

  /**
   * Conta quantos administradores ativos existem no sistema
   * @returns {Promise<number>} Número de administradores ativos
   */
  async countActiveAdmins(): Promise<number> {
    return await db.usuario.count({
      where: { tipo: TipoUsuario.ADMIN, deletadoEm: null }
    })
  }
}
