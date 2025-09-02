import { UsuarioResponseDTO } from '../dtos/response/UsuarioResponseDTO'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { IUsuarioService } from '../interfaces/services/IUsuarioService'
import {
  toCreateUsuarioDTO,
  toUpdateUsuarioDTO
} from '../mappers/input/usuarioInputMapper'
import {
  toUsuarioResponseDTO,
  toUsuariosResponseDTO
} from '../mappers/output/usuarioOutputMapper'
import { throwIfAlreadyExists, throwIfNotFound } from '../utils/entityValidator'

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
   * @param {unknown} data - Dados não tipados do usuário vindos da requisição
   * @returns {Promise<UsuarioResponseDTO>} Usuário criado formatado para resposta
   * @throws {HttpError} Quando email ou telefone já existem
   */
  async create(data: unknown): Promise<UsuarioResponseDTO> {
    const usuarioData = await toCreateUsuarioDTO(data)

    const [usuarioWithEmail, usuarioWithTelefone] = await Promise.all([
      this.usuarioRepository.findByEmail(usuarioData.email),
      this.usuarioRepository.findByTelefone(usuarioData.telefone)
    ])

    throwIfAlreadyExists(
      usuarioWithEmail,
      'Já existe um usuário cadastrado com este email.'
    )

    throwIfAlreadyExists(
      usuarioWithTelefone,
      'Já existe um usuário cadastrado com este telefone.'
    )

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
      const usuarioWithEmail = await this.usuarioRepository.findByEmail(
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
        await this.usuarioRepository.findByTelefone(updateData.telefone),
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
   */
  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.usuarioRepository.findById(id),
      'Usuário não encontrado'
    )

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
}
