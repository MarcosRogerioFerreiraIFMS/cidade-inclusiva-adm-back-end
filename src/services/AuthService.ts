import type { LoginResponseDTO, UsuarioResponseDTO } from '@/dtos/response'
import { HttpStatusCode } from '@/enums'
import type { IUsuarioAccess } from '@/interfaces/access'
import type { IAuthService } from '@/interfaces/services'
import { toCreateLoginDTO } from '@/mappers/input'
import { toUsuarioResponseDTO } from '@/mappers/output'
import { HttpError, JWTUtils, throwIfNotFound, type JWTPayload } from '@/utils'
import { compareSync } from 'bcryptjs'

/**
 * Serviço responsável pelas operações de autenticação e autorização
 */
export class AuthService implements IAuthService {
  /**
   * @param {IUsuarioAccess} usuarioRepository - Repositório de usuários para acesso aos dados
   */
  constructor(private usuarioRepository: IUsuarioAccess) {}

  /**
   * Realiza a autenticação do usuário com email e senha
   * @param {unknown} loginData - Dados de login não tipados vindos da requisição
   * @returns {Promise<LoginResponseDTO>} Token JWT e dados do usuário autenticado
   * @throws {HttpError} Quando as credenciais são inválidas
   */
  async login(loginData: unknown): Promise<LoginResponseDTO> {
    const { email, senha } = toCreateLoginDTO(loginData)

    const usuario = await this.usuarioRepository.findByEmail(email)

    if (!usuario) {
      throw new HttpError('Credenciais inválidas', HttpStatusCode.UNAUTHORIZED)
    }

    const senhaValida = compareSync(senha, usuario.senha)

    if (!senhaValida) {
      throw new HttpError('Credenciais inválidas', HttpStatusCode.UNAUTHORIZED)
    }

    const token = JWTUtils.generateToken({
      userId: usuario.id,
      email: usuario.email,
      tipo: usuario.tipo
    })

    return {
      token,
      usuario: toUsuarioResponseDTO(usuario)
    }
  }

  /**
   * Valida um token JWT e retorna os dados do usuário autenticado
   * @param {JWTPayload | undefined} user - Payload do token JWT
   * @returns {Promise<{ userId: string; email: string }>} Dados do usuário
   * @throws {HttpError} Quando o token é inválido ou o usuário não existe
   */
  async me(user: JWTPayload | undefined): Promise<UsuarioResponseDTO> {
    if (!user) {
      throw new HttpError('Token inválido', HttpStatusCode.UNAUTHORIZED)
    }

    const usuario = throwIfNotFound(
      await this.usuarioRepository.findById(user.userId),
      'Usuário não encontrado'
    )

    return toUsuarioResponseDTO(usuario)
  }
}
