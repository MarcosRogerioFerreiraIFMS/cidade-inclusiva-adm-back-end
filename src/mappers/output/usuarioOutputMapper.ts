import { UsuarioResponseDTO } from '../../dtos/response/UsuarioResponseDTO'
import { UsuarioCompletions } from '../../types/UsuarioTypes'
import { removeNullUndefinedProperties } from '../../utils/objectUtils'

export function toUsuarioResponseDTO(
  usuario: UsuarioCompletions
): UsuarioResponseDTO {
  return removeNullUndefinedProperties({
    id: usuario.id,
    nome: usuario.nome,
    telefone: usuario.telefone,
    foto: usuario.foto ?? '',
    email: usuario.email,
    endereco: toEnderecoResponseDTO(usuario.endereco),
    criadoEm: usuario.criadoEm
  })
}

export function toUsuariosResponseDTO(
  usuarios: UsuarioCompletions[]
): UsuarioResponseDTO[] {
  return usuarios.map(toUsuarioResponseDTO)
}

export function toEnderecoResponseDTO(
  endereco: UsuarioCompletions['endereco']
): UsuarioResponseDTO['endereco'] | undefined {
  if (!endereco) return undefined

  return removeNullUndefinedProperties({
    id: endereco.id,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    complemento: endereco.complemento ?? '',
    cidade: endereco.cidade,
    bairro: endereco.bairro,
    cep: endereco.cep,
    estado: endereco.estado,
    pais: endereco.pais
  })
}
