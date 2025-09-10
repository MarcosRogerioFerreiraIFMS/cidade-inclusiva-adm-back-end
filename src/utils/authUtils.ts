import { HttpStatusCode } from '@/enums'
import { IUsuarioAccess } from '@/interfaces/access'
import { UsuarioCompletions } from '@/types'
import { comparePassword, HttpError } from '@/utils'

/**
 * Autentica um usuário verificando email e senha
 * @param {string} email - Email do usuário
 * @param {string} password - Senha fornecida pelo usuário
 * @param {IUsuarioAccess} IUsuarioAccess - Interface de acesso aos dados do usuário
 * @returns {Promise<Omit<UsuarioCompletions, 'senha'>>} Dados do usuário sem a senha
 * @throws {HttpError} Erro de autenticação se credenciais inválidas
 */
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

  // Remove a senha dos dados retornados por segurança
  const usuarioSemSenha = { ...usuario, senha: undefined }

  return usuarioSemSenha
}
