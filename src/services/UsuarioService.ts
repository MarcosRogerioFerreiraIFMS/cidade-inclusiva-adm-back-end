import type { UsuarioResponseDTO } from '@/dtos/response'
import { HttpStatusCode, UsuarioTipo } from '@/enums'
import type { IUsuarioAccess } from '@/interfaces/access'
import type { IUsuarioService } from '@/interfaces/services'
import {
  toCreateAdminDTO,
  toCreateUsuarioDTO,
  toUpdateUsuarioDTO
} from '@/mappers/input'
import { toUsuarioResponseDTO, toUsuariosResponseDTO } from '@/mappers/output'
import { HttpError, throwIfAlreadyExists, throwIfNotFound } from '@/utils'

/**
 * Serviço responsável pela lógica de negócio de usuários:
 * - Implementa validações, regras de negócio e orquestra operações do repositório
 */
export class UsuarioService implements IUsuarioService {
  /**
   * @param {IUsuarioAccess} usuarioRepository - Repositório de usuários para acesso aos dados
   */
  constructor(private usuarioRepository: IUsuarioAccess) {}

  /**
   * Cria um novo usuário no sistema:
   * - Valida unicidade de email e telefone antes da criação
   * - Se usuário existir e estiver deletado, reativa e atualiza com novos dados
   * @param {unknown} data - Dados não tipados do usuário vindos da requisição
   * @returns {Promise<UsuarioResponseDTO>} Usuário criado formatado para resposta
   * @throws {HttpError} Quando email ou telefone já existem em usuário ativo
   */
  async create(data: unknown): Promise<UsuarioResponseDTO> {
    const usuarioData = await toCreateUsuarioDTO(data)

    // Verificar se já existe usuário com o mesmo email ou telefone (incluindo deletados)
    const [
      usuarioWithEmail,
      usuarioWithTelefone,
      usuarioWithEmailDeleted,
      usuarioWithTelefoneDeleted
    ] = await Promise.all([
      this.usuarioRepository.findByEmail(usuarioData.email),
      this.usuarioRepository.findByTelefone(usuarioData.telefone),
      this.usuarioRepository.findByEmailIncludingDeleted(usuarioData.email),
      this.usuarioRepository.findByTelefoneIncludingDeleted(
        usuarioData.telefone
      )
    ])

    // Se existir usuário ativo com email ou telefone, lança erro
    throwIfAlreadyExists(
      usuarioWithEmail,
      'Já existe um usuário cadastrado com este email.'
    )

    throwIfAlreadyExists(
      usuarioWithTelefone,
      'Já existe um usuário cadastrado com este telefone.'
    )

    // Se existir usuário deletado com o email, reativar e atualizar
    if (usuarioWithEmailDeleted && usuarioWithEmailDeleted.deletadoEm) {
      const usuario = await this.usuarioRepository.restoreAndUpdate(
        usuarioWithEmailDeleted.id,
        usuarioData
      )
      return toUsuarioResponseDTO(usuario)
    }

    // Se existir usuário deletado com o telefone, reativar e atualizar
    if (usuarioWithTelefoneDeleted && usuarioWithTelefoneDeleted.deletadoEm) {
      const usuario = await this.usuarioRepository.restoreAndUpdate(
        usuarioWithTelefoneDeleted.id,
        usuarioData
      )
      return toUsuarioResponseDTO(usuario)
    }

    // Criar novo usuário
    const usuario = await this.usuarioRepository.create(usuarioData)

    return toUsuarioResponseDTO(usuario)
  }

  /**
   * Busca um usuário por ID
   * @param {string} id - ID único do usuário
   * @returns {Promise<UsuarioResponseDTO>} Usuário encontrado formatado para resposta
   * @throws {HttpError} Quando o usuário não é encontrado
   */
  async findById(id: string): Promise<UsuarioResponseDTO> {
    const usuario = throwIfNotFound(
      await this.usuarioRepository.findById(id),
      'Usuário não encontrado.'
    )

    return toUsuarioResponseDTO(usuario)
  }

  /**
   * Busca um usuário por email
   * @param {string} email - Email único do usuário
   * @returns {Promise<UsuarioResponseDTO>} Usuário encontrado formatado para resposta
   * @throws {HttpError} Quando o usuário não é encontrado
   */
  async findByEmail(email: string): Promise<UsuarioResponseDTO> {
    const usuario = throwIfNotFound(
      await this.usuarioRepository.findByEmail(email),
      'Usuário não encontrado.'
    )

    return toUsuarioResponseDTO(usuario)
  }

  /**
   * Atualiza os dados de um usuário existente:
   * - Valida se novos email/telefone não conflitam com outros usuários
   * @param {string} id - ID único do usuário
   * @param {unknown} data - Dados não tipados de atualização
   * @returns {Promise<UsuarioResponseDTO>} Usuário atualizado formatado para resposta
   * @throws {HttpError} Quando o usuário não existe ou há conflito de dados
   */
  async update(id: string, data: unknown): Promise<UsuarioResponseDTO> {
    const existingUsuario = throwIfNotFound(
      await this.usuarioRepository.findById(id),
      'Usuário não encontrado.'
    )

    const updateData = await toUpdateUsuarioDTO(data)

    if (updateData.email && updateData.email !== existingUsuario.email) {
      const usuarioWithEmail =
        await this.usuarioRepository.findByEmailIncludingDeleted(
          updateData.email
        )

      if (usuarioWithEmail && usuarioWithEmail.id !== id) {
        throwIfAlreadyExists(
          usuarioWithEmail,
          'Já existe um usuário cadastrado com este email.'
        )
      }
    }

    if (
      updateData.telefone &&
      updateData.telefone !== existingUsuario.telefone
    ) {
      throwIfAlreadyExists(
        await this.usuarioRepository.findByTelefoneIncludingDeleted(
          updateData.telefone
        ),
        'Já existe um usuário cadastrado com este telefone.'
      )
    }

    const usuario = await this.usuarioRepository.update(id, updateData)

    return toUsuarioResponseDTO(usuario)
  }

  /**
   * Remove um usuário do sistema
   * @param {string} id - ID único do usuário a ser removido
   * @returns {Promise<void>}
   * @throws {HttpError} Quando o usuário não é encontrado
   * @throws {HttpError} Quando é o último administrador do sistema
   */
  async delete(id: string): Promise<void> {
    const usuario = throwIfNotFound(
      await this.usuarioRepository.findById(id),
      'Usuário não encontrado'
    )

    if (usuario.tipo === UsuarioTipo.ADMIN) {
      const activeAdminsCount = await this.usuarioRepository.countActiveAdmins()

      if (activeAdminsCount <= 1) {
        throw new HttpError(
          'Não é possível excluir o último administrador do sistema.',
          HttpStatusCode.BAD_REQUEST
        )
      }
    }

    await this.usuarioRepository.delete(id)
  }

  /**
   * Lista todos os usuários do sistema
   * @returns {Promise<UsuarioResponseDTO[]>} Lista de usuários formatada para resposta
   */
  async findAll(): Promise<UsuarioResponseDTO[]> {
    const usuarios = await this.usuarioRepository.findAll()

    if (!usuarios || usuarios.length === 0) {
      return []
    }

    return toUsuariosResponseDTO(usuarios)
  }

  /**
   * Cria um novo administrador no sistema:
   * - Valida unicidade de email e telefone antes da criação
   * - Define automaticamente o tipo como ADMIN
   * - Se administrador existir e estiver deletado, reativa e atualiza com novos dados
   * @param {unknown} data - Dados não tipados do administrador vindos da requisição
   * @returns {Promise<UsuarioResponseDTO>} Administrador criado formatado para resposta
   * @throws {HttpError} Quando email ou telefone já existem em usuário ativo
   */
  async createAdmin(data: unknown): Promise<UsuarioResponseDTO> {
    const adminData = await toCreateAdminDTO(data)

    // Verificar se já existe usuário com o mesmo email ou telefone (incluindo deletados)
    const [
      usuarioWithEmail,
      usuarioWithTelefone,
      usuarioWithEmailDeleted,
      usuarioWithTelefoneDeleted
    ] = await Promise.all([
      this.usuarioRepository.findByEmail(adminData.email),
      this.usuarioRepository.findByTelefone(adminData.telefone),
      this.usuarioRepository.findByEmailIncludingDeleted(adminData.email),
      this.usuarioRepository.findByTelefoneIncludingDeleted(adminData.telefone)
    ])

    // Se existir usuário ativo com email ou telefone, lança erro
    throwIfAlreadyExists(
      usuarioWithEmail,
      'Já existe um usuário cadastrado com este email.'
    )

    throwIfAlreadyExists(
      usuarioWithTelefone,
      'Já existe um usuário cadastrado com este telefone.'
    )

    // Se existir administrador deletado com o email, reativar e atualizar
    if (usuarioWithEmailDeleted && usuarioWithEmailDeleted.deletadoEm) {
      const usuario = await this.usuarioRepository.restoreAndUpdateAdmin(
        usuarioWithEmailDeleted.id,
        adminData
      )
      return toUsuarioResponseDTO(usuario)
    }

    // Se existir administrador deletado com o telefone, reativar e atualizar
    if (usuarioWithTelefoneDeleted && usuarioWithTelefoneDeleted.deletadoEm) {
      const usuario = await this.usuarioRepository.restoreAndUpdateAdmin(
        usuarioWithTelefoneDeleted.id,
        adminData
      )
      return toUsuarioResponseDTO(usuario)
    }

    // Criar novo administrador
    const usuario = await this.usuarioRepository.createAdmin(adminData)

    return toUsuarioResponseDTO(usuario)
  }
}
