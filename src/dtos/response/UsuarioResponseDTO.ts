export interface UsuarioResponseDTO {
  id: string
  nome: string
  telefone: string
  foto?: string
  email: string
  endereco?: EnderecoResponseDTO
  criadoEm: Date
}

export interface EnderecoResponseDTO {
  id: string
  logradouro: string
  numero: string
  complemento?: string
  cidade: string
  bairro: string
  cep: string
  estado: string
  pais: string
}
