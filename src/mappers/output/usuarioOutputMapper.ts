import { UsuarioResponseDTO } from '../../dtos/response/UsuarioResponseDTO'
import { UsuarioCompletions } from '../../types/UsuarioTypes'

/**
 * - Converte entidade Usuario completa para DTO de resposta
 * - Remove dados sensíveis e estrutura para exposição via API
 * @param {UsuarioCompletions} usuario - Entidade usuario completa do banco de dados
 * @returns {UsuarioResponseDTO} DTO formatado para resposta da API
 */
export function toUsuarioResponseDTO(
  usuario: UsuarioCompletions
): UsuarioResponseDTO {
  return {
    id: usuario.id,
    nome: usuario.nome,
    telefone: usuario.telefone,
    foto: usuario.foto ?? '',
    email: usuario.email,
    endereco: toEnderecoResponseDTO(usuario.endereco),
    criadoEm: usuario.criadoEm
  }
}

/**
 * - Converte lista de entidades Usuario para lista de DTOs de resposta
 * - Aplica transformação individual para cada usuário da lista
 * @param {UsuarioCompletions[]} usuarios - Lista de entidades usuario do banco de dados
 * @returns {UsuarioResponseDTO[]} Lista de DTOs formatados para resposta da API
 */
export function toUsuariosResponseDTO(
  usuarios: UsuarioCompletions[]
): UsuarioResponseDTO[] {
  return usuarios.map(toUsuarioResponseDTO)
}

/**
 * - Converte entidade Endereco para DTO de resposta
 * - Trata valores opcionais e estrutura dados de endereço
 * @param {UsuarioCompletions['endereco']} endereco - Entidade endereco do banco de dados
 * @returns {UsuarioResponseDTO['endereco'] | undefined} DTO de endereço ou undefined se não existir
 */
export function toEnderecoResponseDTO(
  endereco: UsuarioCompletions['endereco']
): UsuarioResponseDTO['endereco'] | undefined {
  if (!endereco) return undefined

  return {
    id: endereco.id,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    complemento: endereco.complemento ?? '',
    cidade: endereco.cidade,
    bairro: endereco.bairro,
    cep: endereco.cep,
    estado: endereco.estado,
    pais: endereco.pais
  }
}
