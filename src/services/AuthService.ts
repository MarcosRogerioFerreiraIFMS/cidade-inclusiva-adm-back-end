import { compareSync } from 'bcryptjs'
import { LoginResponseDTO } from '../dtos/response/LoginResponseDTO'
import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { IAuthService } from '../interfaces/services/IAuthService'
import { toCreateLoginDTO } from '../mappers/input/loginInputMapper'
import { toUsuarioResponseDTO } from '../mappers/output/usuarioOutputMapper'
import { throwIfNotFound } from '../utils/entityValidator'
import { HttpError } from '../utils/HttpError'
import { JWTUtils } from '../utils/jwtUtils'

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

    const token = `Bearer ${JWTUtils.generateToken({
      userId: usuario.id,
      email: usuario.email,
      tipo: usuario.tipo
    })}`

    return {
      token,
      usuario: toUsuarioResponseDTO(usuario)
    }
  }

  /**
   * Valida um token JWT e retorna os dados básicos do usuário
   * @param {string} token - Token JWT a ser validado
   * @returns {Promise<{ userId: string; email: string }>} Dados básicos do usuário
   * @throws {HttpError} Quando o token é inválido ou o usuário não existe
   */
  async validateToken(
    token: string
  ): Promise<{ userId: string; email: string }> {
    try {
      const decoded = JWTUtils.verifyToken(token)

      throwIfNotFound(
        await this.usuarioRepository.findById(decoded.userId),
        'Usuário não encontrado'
      )

      return {
        userId: decoded.userId,
        email: decoded.email
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw error
      }

      throw new HttpError('Token inválido', HttpStatusCode.UNAUTHORIZED)
    }
  }
}
