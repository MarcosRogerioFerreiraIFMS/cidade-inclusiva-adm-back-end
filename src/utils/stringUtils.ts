/**
 * Capitaliza a primeira letra de uma palavra
 * @param {string} word - Palavra a ser capitalizada
 * @returns {string} Palavra com primeira letra maiúscula e restante minúscula
 */
export function capitalizeFirstLetter(word: string): string {
  if (!word || typeof word !== 'string') return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/**
 * Capitaliza a primeira letra de cada palavra em um texto
 * @param {string} text - Texto com múltiplas palavras
 * @returns {string} Texto com cada palavra capitalizada
 */
export function capitalizeWords(text: string): string {
  if (!text || typeof text !== 'string') return ''
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter((word) => word.length > 0)
    .map(capitalizeFirstLetter)
    .join(' ')
}

/**
 * Sanitiza uma string removendo caracteres especiais e normalizando espaços
 * @param {string} str - String a ser sanitizada
 * @returns {string} String sanitizada e normalizada
 */
export const sanitizeString = (str: string): string => {
  if (!str || typeof str !== 'string') return ''

  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[^\w\s\-.,!?()áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Sanitiza conteúdo de texto preservando formatação básica e quebras de linha
 * @param {string} str - Conteúdo a ser sanitizado
 * @returns {string} Conteúdo sanitizado mantendo estrutura básica
 */
export const sanitizeContent = (str: string): string => {
  if (!str || typeof str !== 'string') return ''

  return str
    .trim()
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length > 0)
    .join('\n')
    .replace(/[^\w\s\-.,!?()\náàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\n]/gi, '')
    .trim()
}

/**
 * Sanitiza número de telefone removendo caracteres não numéricos
 * @param {string} str - String contendo telefone
 * @returns {string} Apenas dígitos do telefone
 */
export const sanitizeTelefone = (str: string): string => {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/\D/g, '')
}

/**
 * Formata número de telefone brasileiro
 * @param {string} phone - Número de telefone (apenas dígitos ou com formatação)
 * @returns {string} Telefone formatado no padrão brasileiro (xx) xxxxx-xxxx ou (xx) xxxx-xxxx
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone || typeof phone !== 'string') return ''

  // Remove todos os caracteres não numéricos
  const digits = phone.replace(/\D/g, '')

  // Verifica se tem o número correto de dígitos
  if (digits.length < 10 || digits.length > 11) return phone

  // Para números com 11 dígitos (celular com 9)
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  // Para números com 10 dígitos (fixo)
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return phone
}

/**
 * Valida se uma string está dentro do comprimento especificado
 * @param {string} str - String a ser validada
 * @param {number} min - Comprimento mínimo
 * @param {number} max - Comprimento máximo
 * @returns {boolean} True se está dentro dos limites
 */
export const validateStringLength = (
  str: string,
  min: number,
  max: number
): boolean => {
  if (!str || typeof str !== 'string') return false
  const length = str.trim().length
  return length >= min && length <= max
}

/**
 * Remove espaços extras de uma string
 * @param {string} str - String a ser normalizada
 * @returns {string} String com espaços normalizados
 */
export const removeExtraSpaces = (str: string): string => {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/\s+/g, ' ').trim()
}

/**
 * Verifica se a string contém apenas letras e espaços
 * @param {string} str - String a ser verificada
 * @returns {boolean} True se contém apenas letras e espaços
 */
export const containsOnlyLettersAndSpaces = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(str.trim())
}

/**
 * Verifica se a string contém apenas números
 * @param {string} str - String a ser verificada
 * @returns {boolean} True se contém apenas dígitos
 */
export const containsOnlyNumbers = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false
  return /^\d+$/.test(str.trim())
}

/**
 * Valida formato de email usando regex
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se o formato é válido
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const normalizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return ''
  return email.trim().toLowerCase()
}

export const maskSensitiveData = (
  data: string,
  visibleChars: number = 4
): string => {
  if (!data || typeof data !== 'string') return ''

  if (data.length <= visibleChars) {
    return '*'.repeat(data.length)
  }

  const visible = data.slice(-visibleChars)
  const masked = '*'.repeat(data.length - visibleChars)
  return masked + visible
}
