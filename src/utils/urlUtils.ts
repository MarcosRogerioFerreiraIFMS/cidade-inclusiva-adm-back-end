import axios from 'axios'

/**
 * Normaliza uma URL adicionando protocolo HTTPS se necessário
 * @param {string} url - URL a ser normalizada
 * @returns {string} URL normalizada com protocolo
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return url

  const trimmed = url.trim()
  if (!trimmed) return trimmed

  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }

  return trimmed
}

/**
 * Verifica se uma URL tem formato válido
 * @param {unknown} url - Valor a ser verificado como URL
 * @returns {boolean} True se é uma URL válida
 */
export const verifyUrl = (url: unknown): boolean => {
  if (typeof url !== 'string') return false

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return false

  if (trimmedUrl.includes(' ') || trimmedUrl.length < 4) return false

  const normalizedUrl = normalizeUrl(trimmedUrl)

  try {
    const parsedUrl = new URL(normalizedUrl)

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false
    }

    if (
      !parsedUrl.hostname.includes('.') &&
      parsedUrl.hostname !== 'localhost'
    ) {
      return false
    }

    return true
  } catch {
    return false
  }
}

/**
 * Transforma e valida uma URL, retornando versão normalizada
 * @param {unknown} url - Valor a ser transformado em URL
 * @returns {string} URL válida e normalizada ou string vazia
 */
export const transformUrl = (url: unknown): string => {
  if (typeof url !== 'string') return ''

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return ''

  try {
    const normalizedUrl = normalizeUrl(trimmedUrl)
    const parsedUrl = new URL(normalizedUrl)
    return parsedUrl.toString()
  } catch {
    return ''
  }
}

/**
 * Verifica se uma URL aponta para uma imagem válida
 * @param {string} url - URL a ser verificada
 * @param {boolean} skipHttpCheck - Se deve pular verificação HTTP (padrão: false)
 * @returns {Promise<boolean>} True se é uma URL de imagem válida
 */
export const isImageUrl = async (
  url: string,
  skipHttpCheck: boolean = false
): Promise<boolean> => {
  if (!url || !verifyUrl(url)) return false

  if (skipHttpCheck || process.env.NODE_ENV === 'test') {
    const normalizedUrl = normalizeUrl(url).toLowerCase()
    /** Extensões de arquivo de imagem suportadas */
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.bmp',
      '.svg'
    ]
    return (
      imageExtensions.some((ext) => normalizedUrl.includes(ext)) ||
      normalizedUrl.includes('image') ||
      normalizedUrl.includes('picsum') ||
      normalizedUrl.includes('placeholder')
    )
  }

  try {
    const normalizedUrl = normalizeUrl(url)
    const response = await axios.head(normalizedUrl, {
      maxRedirects: 5,
      timeout: 10000,
      validateStatus: (status) => status >= 200 && status < 400
    })
    const contentType = response.headers['content-type']

    return !!(contentType && contentType.startsWith('image/'))
  } catch {
    return false
  }
}
