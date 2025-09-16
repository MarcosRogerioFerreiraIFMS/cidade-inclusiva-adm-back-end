// Exporta todos os enums do sistema
export * from './HttpStatusCode'
export * from './TipoRecurso'

// Re-exporta os enums do Prisma para centralizar o acesso
export {
  CategoriaAcessibilidadeUrbana,
  CategoriaNoticia,
  EspecialidadeProfissional,
  SimboloAcessibilidade,
  StatusMobilidade,
  TipoUsuario
} from '@prisma/client'
