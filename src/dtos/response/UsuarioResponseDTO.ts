/**
 * - DTO (Data Transfer Object) de resposta para usuário
 * - Define a estrutura dos dados de usuário retornados pela API
 * - Exclui campos sensíveis como senha
 */
export interface UsuarioResponseDTO {
  /** ID único do usuário */
  id: string
  /** Nome completo do usuário */
  nome: string
  /** Número de telefone do usuário */
  telefone: string
  /** URL da foto do perfil (opcional) */
  foto?: string
  /** Endereço de email do usuário */
  email: string
  /** Endereço completo do usuário (opcional) */
  endereco?: EnderecoResponseDTO
  /** Data e hora de criação do usuário */
  criadoEm: Date
}

/**
 * DTO (Data Transfer Object) de resposta para endereço
 * Define a estrutura dos dados de endereço retornados pela API
 */
export interface EnderecoResponseDTO {
  /** ID único do endereço */
  id: string
  /** Nome da rua/avenida */
  logradouro: string
  /** Número do imóvel */
  numero: string
  /** Complemento do endereço (apartamento, bloco, etc.) */
  complemento?: string
  /** Nome da cidade */
  cidade: string
  /** Nome do bairro */
  bairro: string
  /** Código postal (CEP) */
  cep: string
  /** Estado/província */
  estado: string
  /** País */
  pais: string
}
