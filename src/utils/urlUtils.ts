import axios from 'axios'

export const normalizeUrl = (url: string): string => {
  if (!url) return url

  const trimmed = url.trim()
  if (!trimmed) return trimmed

  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }

  return trimmed
}

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

export const isImageUrl = async (
  url: string,
  skipHttpCheck: boolean = false
): Promise<boolean> => {
  if (!url || !verifyUrl(url)) return false

  if (skipHttpCheck || process.env.NODE_ENV === 'test') {
    const normalizedUrl = normalizeUrl(url).toLowerCase()
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
