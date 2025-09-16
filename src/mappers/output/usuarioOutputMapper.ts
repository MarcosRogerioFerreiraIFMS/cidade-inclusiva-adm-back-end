import type { UsuarioResponseDTO } from '@/dtos/response'
import type { UsuarioCompletions } from '@/types'
import { toEnderecoResponseDTO } from './enderecoOutputMapper'
import { toFotoResponseDTO } from './fotoOutputMappers'

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
    foto: toFotoResponseDTO(usuario.foto),
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
