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

export class AuthService implements IAuthService {
  constructor(private usuarioRepository: IUsuarioAccess) {}

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
