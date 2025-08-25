import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch {
    throw new Error('Erro ao gerar hash da senha')
  }
}

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
