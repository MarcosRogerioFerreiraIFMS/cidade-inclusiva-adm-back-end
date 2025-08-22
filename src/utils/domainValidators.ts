import { CategoriaNoticia, EspecialidadeProfissional } from '@prisma/client'

export const validateBrazilianStates = (state: string): boolean => {
  const validStates = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ]
  return validStates.includes(state.toUpperCase())
}

export const validateBrazilianDDD = (ddd: string): boolean => {
  const validDDDs = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19', // SP
    '21',
    '22',
    '24', // RJ, ES
    '27',
    '28', // ES
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '38', // MG
    '41',
    '42',
    '43',
    '44',
    '45',
    '46', // PR
    '47',
    '48',
    '49', // SC
    '51',
    '53',
    '54',
    '55', // RS
    '61', // DF, GO
    '62',
    '64', // GO, TO
    '63', // TO
    '65',
    '66', // MT
    '67', // MS
    '68', // AC
    '69', // RO, AC
    '71',
    '73',
    '74',
    '75',
    '77', // BA
    '79', // SE
    '81',
    '87', // PE
    '82', // AL
    '83', // PB
    '84', // RN
    '85',
    '88', // CE
    '86',
    '89', // PI
    '91',
    '93',
    '94', // PA
    '92',
    '97', // AM
    '95', // RR
    '96', // AP
    '98',
    '99' // MA
  ]
  return validDDDs.includes(ddd)
}

export const validateBrazilianCellPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '')

  if (cleanPhone.length !== 11) return false

  const ddd = cleanPhone.substring(0, 2)
  if (!validateBrazilianDDD(ddd)) return false

  const firstDigit = cleanPhone.charAt(2)
  if (firstDigit !== '9') return false

  const allSameDigit = cleanPhone
    .split('')
    .every((digit) => digit === cleanPhone[0])
  if (allSameDigit) return false

  return true
}

export const validateBrazilianCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '')

  if (cleanCEP.length !== 8) return false

  const allSameDigit = cleanCEP
    .split('')
    .every((digit) => digit === cleanCEP[0])
  if (allSameDigit) return false

  const invalidCEPs = [
    '00000000',
    '11111111',
    '22222222',
    '33333333',
    '44444444',
    '55555555',
    '66666666',
    '77777777',
    '88888888',
    '99999999'
  ]
  if (invalidCEPs.includes(cleanCEP)) return false

  return true
}

export const validateNewsCategory = (category: string): boolean => {
  return Object.values(CategoriaNoticia).includes(
    category.toUpperCase() as CategoriaNoticia
  )
}

export const validateProfessionalSpecialty = (specialty: string): boolean => {
  return Object.values(EspecialidadeProfissional).includes(
    specialty.toUpperCase() as EspecialidadeProfissional
  )
}

export const validateStrongPassword = (
  password: string
): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Deve ter pelo menos 8 caracteres')
  }

  if (password.length > 128) {
    errors.push('Deve ter no máximo 128 caracteres')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Deve conter pelo menos uma letra minúscula')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Deve conter pelo menos uma letra maiúscula')
  }

  if (!/\d/.test(password)) {
    errors.push('Deve conter pelo menos um número')
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Deve conter pelo menos um caractere especial (@$!%*?&)')
  }

  if (/\s/.test(password)) {
    errors.push('Não pode conter espaços')
  }

  const hasSequentialChars =
    /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(
      password
    )
  if (hasSequentialChars) {
    errors.push('Não pode conter sequências simples (abc, 123, etc.)')
  }

  const hasRepeatingChars = /(.)\1{2,}/.test(password)
  if (hasRepeatingChars) {
    errors.push('Não pode conter mais de 2 caracteres iguais consecutivos')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validatePersonName = (
  name: string
): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  const trimmedName = name.trim()

  if (trimmedName.length < 2) {
    errors.push('Deve ter pelo menos 2 caracteres')
  }

  if (trimmedName.length > 100) {
    errors.push('Deve ter no máximo 100 caracteres')
  }

  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedName)) {
    errors.push('Deve conter apenas letras e espaços')
  }

  const words = trimmedName.split(/\s+/).filter((word) => word.length > 0)
  if (words.length < 2) {
    errors.push('Deve conter pelo menos nome e sobrenome')
  }

  const connectors = ['de', 'da', 'do', 'dos', 'das', 'e']
  const invalidWords = words.filter(
    (word) => word.length < 2 && !connectors.includes(word.toLowerCase())
  )

  if (invalidWords.length > 0) {
    errors.push('Cada parte do nome deve ter pelo menos 2 caracteres')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateEmailDomain = (email: string): boolean => {
  const domain = email.split('@')[1]
  if (!domain) return false

  const trustedDomains = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com.br',
    'yahoo.com',
    'uol.com.br',
    'bol.com.br',
    'terra.com.br',
    'ig.com.br',
    'globo.com',
    'r7.com',
    'zipmail.com.br',
    'itelefonica.com.br',
    'live.com',
    'icloud.com'
  ]

  return (
    trustedDomains.includes(domain.toLowerCase()) ||
    /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(domain)
  )
}

export const sanitizeAndValidateComment = (
  content: string
): {
  sanitized: string
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  if (!content || typeof content !== 'string') {
    errors.push('Conteúdo é obrigatório')
    return { sanitized: '', isValid: false, errors }
  }

  const sanitized = content
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[<>]/g, '')
    .slice(0, 1000)

  if (sanitized.length === 0) {
    errors.push('Conteúdo não pode estar vazio')
  }

  if (sanitized.length > 1000) {
    errors.push('Conteúdo deve ter no máximo 1000 caracteres')
  }

  const spamPatterns = [
    /(.)\1{10,}/,
    /http[s]?:\/\//gi,
    /\b(viagra|cialis|casino|poker|bitcoin|crypto)\b/gi
  ]

  const hasSpam = spamPatterns.some((pattern) => pattern.test(sanitized))
  if (hasSpam) {
    errors.push('Conteúdo pode conter spam ou conteúdo inadequado')
  }

  return {
    sanitized,
    isValid: errors.length === 0,
    errors
  }
}
