import type { LoginResponseDTO, UsuarioResponseDTO } from '@/dtos/response'
import { HttpStatusCode } from '@/enums'
import type { IUsuarioAccess } from '@/interfaces/access'
import type { IAuthService } from '@/interfaces/services'
import { toCreateLoginDTO } from '@/mappers/input'
import { toUsuarioResponseDTO } from '@/mappers/output'
import type { UsuarioCompletions } from '@/types'
import { HttpError, JWTUtils } from '@/utils'
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
   * @param {UsuarioCompletions | undefined} user - Dados completos do usuário autenticado
   * @returns {Promise<UsuarioResponseDTO>} Dados do usuário
   * @throws {HttpError} Quando o usuário não é fornecido
   */
  me(user: UsuarioCompletions | undefined): UsuarioResponseDTO {
    if (!user) {
      throw new HttpError(
        'Usuário não autenticado',
        HttpStatusCode.UNAUTHORIZED
      )
    }

    // Os dados do usuário já estão completos, não é necessário buscar novamente
    return toUsuarioResponseDTO(user)
  }
}
