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

export class UsuarioService implements IUsuarioService {
  constructor(private usuarioRepository: IUsuarioAccess) {}

  async create(data: unknown): Promise<UsuarioResponseDTO> {
    const usuarioData = await toCreateUsuarioDTO(data)

    throwIfAlreadyExists(
      await this.usuarioRepository.findByEmail(usuarioData.email),
      'Já existe um usuário cadastrado com este email.'
    )

    throwIfAlreadyExists(
      await this.usuarioRepository.findByTelefone(usuarioData.telefone),
      'Já existe um usuário cadastrado com este telefone.'
    )

    const usuario = await this.usuarioRepository.create(usuarioData)

    return toUsuarioResponseDTO(usuario)
  }

  async findById(id: string): Promise<UsuarioResponseDTO> {
    const usuario = throwIfNotFound(
      await this.usuarioRepository.findById(id),
      'Usuário não encontrado.'
    )

    return toUsuarioResponseDTO(usuario)
  }

  async findByEmail(email: string): Promise<UsuarioResponseDTO> {
    const usuario = throwIfNotFound(
      await this.usuarioRepository.findByEmail(email),
      'Usuário não encontrado.'
    )

    return toUsuarioResponseDTO(usuario)
  }

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

  async delete(id: string): Promise<void> {
    throwIfNotFound(
      await this.usuarioRepository.findById(id),
      'Usuário não encontrado'
    )

    await this.usuarioRepository.delete(id)
  }

  async findAll(): Promise<UsuarioResponseDTO[]> {
    const usuarios = await this.usuarioRepository.findAll()

    if (!usuarios || usuarios.length === 0) {
      return []
    }

    return toUsuariosResponseDTO(usuarios)
  }
}
