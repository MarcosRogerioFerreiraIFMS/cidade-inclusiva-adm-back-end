import rateLimit from 'express-rate-limit'

/** Opções base para todos os rate limiters */
const baseRateLimitOptions = {
  standardHeaders: 'draft-8' as const,
  legacyHeaders: false
}

/** Opções de tempo e quantidade para cada tipo de operação */
const RATE_LIMIT_OPTIONS = {
  login: { windowMs: 15 * 60 * 1000, max: 10 }, // 15 minutos, 10 tentativas
  register: { windowMs: 60 * 60 * 1000, max: 5 }, // 1 hora, 5 registros
  tokenValidation: { windowMs: 5 * 60 * 1000, max: 40 }, // 5 minutos, 40 validações
  adminOperations: { windowMs: 10 * 60 * 1000, max: 100 }, // 10 minutos, 100 operações
  contentCreation: { windowMs: 10 * 60 * 1000, max: 20 }, // 10 minutos, 20 criações
  modifications: { windowMs: 5 * 60 * 1000, max: 30 }, // 5 minutos, 30 modificações
  readOperations: { windowMs: 5 * 60 * 1000, max: 100 }, // 5 minutos, 100 leituras
  emailSearch: { windowMs: 15 * 60 * 1000, max: 20 } // 15 minutos, 20 buscas por email
}

/**
 * Rate limiting específico para operações de login
 * Mais restritivo para prevenir ataques de força bruta
 */
export const loginRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.login.windowMs,
  max: RATE_LIMIT_OPTIONS.login.max,
  message: {
    success: false,
    error: `Muitas tentativas de login. Tente novamente em ${
      RATE_LIMIT_OPTIONS.login.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_LOGIN'
  },
  ...baseRateLimitOptions,
  // Desconsiderar requisições bem-sucedidas
  skipSuccessfulRequests: true
})

/**
 * Rate limiting para operações de criação de usuário (registro)
 * Previne spam de criação de contas
 */
export const registerRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.register.windowMs,
  max: RATE_LIMIT_OPTIONS.register.max,
  message: {
    success: false,
    error: `Muitas tentativas de registro. Tente novamente em ${
      RATE_LIMIT_OPTIONS.register.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_REGISTER'
  },
  ...baseRateLimitOptions,
  skipSuccessfulRequests: true
})

/**
 * Rate limiting para validação de token
 * Previne abuso de verificação de tokens
 */
export const tokenValidationRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.tokenValidation.windowMs,
  max: RATE_LIMIT_OPTIONS.tokenValidation.max,
  message: {
    success: false,
    error: `Muitas tentativas de validação de token. Tente novamente em ${
      RATE_LIMIT_OPTIONS.tokenValidation.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_TOKEN_VALIDATION'
  },
  ...baseRateLimitOptions
})

/**
 * Rate limiting para operações administrativas sensíveis
 * Como listar todos os usuários, buscar por email, etc.
 */
export const adminOperationsRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.adminOperations.windowMs,
  max: RATE_LIMIT_OPTIONS.adminOperations.max,
  message: {
    success: false,
    error: `Muitas operações administrativas. Tente novamente em ${
      RATE_LIMIT_OPTIONS.adminOperations.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_ADMIN_OPERATIONS'
  },
  ...baseRateLimitOptions
})

/**
 * Rate limiting para operações de criação de conteúdo
 * Previne spam de notícias, comentários, etc.
 */
export const contentCreationRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.contentCreation.windowMs,
  max: RATE_LIMIT_OPTIONS.contentCreation.max,
  message: {
    success: false,
    error: `Muitas criações de conteúdo. Tente novamente em ${
      RATE_LIMIT_OPTIONS.contentCreation.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_CONTENT_CREATION'
  },
  ...baseRateLimitOptions,
  skipSuccessfulRequests: true
})

/**
 * Rate limiting para operações de atualização/deleção
 * Previne abuso de operações destrutivas
 */
export const modificationRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.modifications.windowMs,
  max: RATE_LIMIT_OPTIONS.modifications.max,
  message: {
    success: false,
    error: `Muitas operações de modificação. Tente novamente em ${
      RATE_LIMIT_OPTIONS.modifications.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_MODIFICATIONS'
  },
  ...baseRateLimitOptions
})

/**
 * Rate limiting mais permissivo para operações de leitura
 * Ainda previne abuso mas permite uso normal
 */
export const readOperationsRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.readOperations.windowMs,
  max: RATE_LIMIT_OPTIONS.readOperations.max,
  message: {
    success: false,
    error: `Muitas operações de leitura. Tente novamente em ${
      RATE_LIMIT_OPTIONS.readOperations.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_READ_OPERATIONS'
  },
  ...baseRateLimitOptions
})

/**
 * Rate limiting para busca por email
 * Operação muito sensível que pode expor informações
 */
export const emailSearchRateLimit = rateLimit({
  windowMs: RATE_LIMIT_OPTIONS.emailSearch.windowMs,
  max: RATE_LIMIT_OPTIONS.emailSearch.max,
  message: {
    success: false,
    error: `Muitas buscas por email. Tente novamente em ${
      RATE_LIMIT_OPTIONS.emailSearch.windowMs / 1000 / 60
    } minutos.`,
    code: 'RATE_LIMIT_EMAIL_SEARCH'
  },
  ...baseRateLimitOptions
})
