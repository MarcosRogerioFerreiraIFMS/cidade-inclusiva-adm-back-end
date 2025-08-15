export function capitalizeFirstLetter(word: string): string {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function capitalizeWords(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter((word) => word.length > 0)
    .map(capitalizeFirstLetter)
    .join(' ')
}

export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[^\w\s\-.,!?()áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ]/gi, '')
}

export const sanitizeContent = (str: string): string => {
  return str
    .trim()
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length > 0)
    .join('\n')
    .replace(/[^\w\s\-.,!?()\náàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\n]/gi, '')
}

export const sanitizeTelefone = (str: string): string => {
  return str.replace(/\D/g, '')
}
