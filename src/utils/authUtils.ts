import { HttpStatusCode } from '../enums/HttpStatusCode'
import { IUsuarioAccess } from '../interfaces/access/IUsuarioAccess'
import { UsuarioCompletions } from '../types/UsuarioTypes'
import { HttpError } from '../utils/HttpError'
import { comparePassword } from '../utils/passwordUtils'

export const authenticateUser = async (
  email: string,
  password: string,
  IUsuarioAccess: IUsuarioAccess
): Promise<Omit<UsuarioCompletions, 'senha'>> => {
  const usuario = await IUsuarioAccess.findByEmail(email)

  if (!usuario) {
    throw new HttpError('Email ou senha inválidos', HttpStatusCode.UNAUTHORIZED)
  }

  const isPasswordValid = await comparePassword(password, usuario.senha)

  if (!isPasswordValid) {
    throw new HttpError('Email ou senha inválidos', HttpStatusCode.UNAUTHORIZED)
  }

  const usuarioSemSenha = { ...usuario, senha: undefined }

  return usuarioSemSenha
}
