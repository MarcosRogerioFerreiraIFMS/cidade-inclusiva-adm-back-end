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
