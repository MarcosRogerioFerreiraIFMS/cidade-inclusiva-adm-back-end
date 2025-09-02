import bcrypt from 'bcryptjs'

/**
 * Número de rounds de salt para geração de hash das senhas
 * Valor alto para maior segurança (12 rounds = ~250ms por hash)
 * @constant {number}
 */
const SALT_ROUNDS = 12

/**
 * Gera um hash seguro da senha usando bcrypt
 * Utiliza salt rounds de 12 para garantir segurança contra ataques de força bruta
 * @param {string} password - Senha em texto plano a ser hasheada
 * @returns {Promise<string>} Hash da senha gerado com salt
 * @throws {Error} Erro ao gerar hash da senha
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch {
    throw new Error('Erro ao gerar hash da senha')
  }
}

/**
 * Compara uma senha em texto plano com seu hash armazenado
 * Utilizado durante o processo de autenticação para validar credenciais
 * @param {string} password - Senha em texto plano fornecida pelo usuário
 * @param {string} hash - Hash da senha armazenado no banco de dados
 * @returns {Promise<boolean>} true se a senha corresponde ao hash, false caso contrário
 * @throws {Error} Erro ao verificar senha
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash)
  } catch {
    throw new Error('Erro ao verificar senha')
  }
}
