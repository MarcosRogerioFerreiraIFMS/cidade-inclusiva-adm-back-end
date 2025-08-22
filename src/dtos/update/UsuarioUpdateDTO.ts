export interface UsuarioUpdateDTO {
  nome?: string
  telefone?: string
  foto?: string
  email?: string
  senha?: string
  endereco?: {
    logradouro?: string
    numero?: string
    complemento?: string
    cidade?: string
    bairro?: string
    cep?: string
    estado?: string
    pais?: string
  }
}
