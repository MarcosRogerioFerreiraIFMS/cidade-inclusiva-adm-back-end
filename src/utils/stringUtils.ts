export function capitalizeFirstLetter(word: string): string {
  if (!word || typeof word !== 'string') return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

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

export const sanitizeTelefone = (str: string): string => {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/\D/g, '')
}

export const validateStringLength = (
  str: string,
  min: number,
  max: number
): boolean => {
  if (!str || typeof str !== 'string') return false
  const length = str.trim().length
  return length >= min && length <= max
}

export const removeExtraSpaces = (str: string): string => {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/\s+/g, ' ').trim()
}

export const containsOnlyLettersAndSpaces = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(str.trim())
}

export const containsOnlyNumbers = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false
  return /^\d+$/.test(str.trim())
}

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
